# 数说官网开发总结——从CSR到SSR的实践思路

CSR：client side render 客户端渲染

SSR：server side render 服务端渲染

下文中统一使用上述简写。


## csr VS ssr

官网初版采用的就是csr，不需要服务端代码，服务端只需返回index.html文件，然后index.html再通过link，script标签引用webpack打包后的css，js文件。这样的话，所有组件的渲染都放在客户端完成，最后借助vue-router根据不同的页面路由，在 **\<router-view>\</router-view>** 里面渲染对应的组件，就可以把官网做成基于vue的SPA应用。

这样做的好处是:

1. 项目结构简单，不需要后端代码渲染组件

2. 采用vue1.0 + vue-router0.7.x + webpack 有规范的文档可以参考，API相对固定

3. SPA的种种优点，用户体验nice

但同时也存在以下弊端：

1. 对SEO不友好，作为官网而言，这一点不可忽视，爬虫只能看到 **\<router-view>\</router-view>** ，却看不到里面实际的内容

2. 大量的前端js代码，提升客户端负载，导致页面首屏时间延长（更何况官网还不存在ajax请求）


为了解决csr的弊端，决定将官网项目迁移至ssr版本，即vue2.0的new feature: ssr

既然是迁移，注定会遇到很多的问题，主要有：

- 从vue1.0 到 vue2.0 API的变更，例如不支持组件间dispatch 和 broadcast，只能采用vuex进行全局组件状态管理

- vue-router 也升级为vue-router2.0，导致路由列表变动：

~~~javascript
const router = new VueRouter({
  mode: 'history',
  scrollBehavior: ()=>{{y:0}},
  routes: [
    { path: '/', component: Index },
    { path: '/index', component: Index },
    { path: '/pands', component: PandS,
      children: [
        { path: '', component: Solution},
        { path: 'solution', component: Solution},
        { path: 'product', component: Product}
      ]
    },
    { path: '/report', component: Report },
    { path: '/about', component: About },
    { path: '*', redirect: '/' },
  ]
});
~~~

- 如何实现 vue 组件的服务端渲染，并返回html代码？ （How to code T_T）


## vue2.0 开启ssr

介绍下vue2.0的新内容

vue2.0于2016年4月开启public preview版本，提供了一系列新特性： [原文链接](http://jiongks.name/blog/announcing-vue-2/)

1. virtual dom渲染层，更轻更快，提升渲染速度，降低内存消耗

2. 既支持模板语法，也支持类似jsx的render函数语法

3. 支持流式服务端渲染，渲染组件的时候返回stream，然后直接pipe到HTTP response

4. weex + Native？

5. PS: 这很 react

## 如何做？

我们可以先看一下vue官方给的项目架构图：

![vue-ssr-architecture](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

很显然，要兵分两路：

1. 服务端渲染： server-entry => server-bundle => bundleRenderer => render to html

&

2. 客户端混合： client-entry => client-bundle => virtual dom => Hydrate


### 兵线 1 服务端渲染

> 代码参考官方 demo [vue-hacker-news2.0](https://github.com/vuejs/vue-hackernews-2.0)

首先，建立服务端，可以搭建一个简单的express服务器：

~~~javascript
const app = express()

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost: ${port}`)
})
~~~

然后借助vue-server-render API创建renderer

~~~javascript
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

function createRenderer(bundle) {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

let renderer

if (isProd) {
    const bundlePath = resolve('./dist/server-bundle.js')
    renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))
}
~~~

在上述代码中，我们通过createBundleRenderer函数将server-bundle.js 打包，新建了一个renderer, 而这个server-bundle.js 其实就是用webpack的node模式将整个vue app包括router，store神马的单独打包，这样在每次请求和渲染的时候，可以通过node的vm模块将代码运行在一个全新的context下，避免了由于缓存导致的vuex state冲突，虽然冲突过程不得而知，但尽可能解耦总是对的。

此外，server-bundle.js需要暴露一个函数，并传入render context object，返回值是一个Promise

~~~javascript
export default context => {
  // set router's location
  router.push(context.url)
  
  const s = isDev && Date.now()

  // Call preFetch hooks on components matched by the route.
  // A preFetch hook dispatches a store action and returns a Promise,
  // which is resolved when the action is complete and store state has been
  // updated.
  return Promise.all(router.getMatchedComponents().map(component => {
    // if (component.preFetch) {
    //   return component.preFetch(store)
    // }
  })).then(() => {
    isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
    // After all preFetch hooks are resolved, our store is now
    // filled with the state needed to render the app.
    // Expose the state on the render context, and let the request handler
    // inline the state in the HTML response. This allows the client-side
    // store to pick-up the server-side state without having to duplicate
    // the initial data fetching on the client.
    context.initialState = store.state
    return app
  })
}
~~~

其中context object参数就是 renderer.renderToStream(context)中的context参数。

~~~javascript

const html = (() => {
  const template = fs.readFileSync(resolve('./index.html'), 'utf-8')
  const i = template.indexOf('{{ APP }}')

  const style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">':  ''
  return {
    head: template.slice(0, i).replace('{{ STYLE }}', style),
    tail: template.slice(i + '{{ APP }}'.length)
  }
})()

app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation...')
  }

  const s = Date.now()
  const context = {url: req.url}
  const renderStream = renderer.renderToStream(context)

  let firstChunk = true

  res.write(html.head)

  renderStream.on('data', chunk => {
    if (firstChunk) {
      if (context.initialState) {
        res.write(
          `<script>window.__INITIAL_STATE__=${
            serialize(context.initialState, { isJSON: true })
          }</script>`
        )
      }
      firstChunk = false
    }
    res.write(chunk)
  })

  renderStream.on('end', ()=>{
    res.end(html.tail)
    console.log(`whole request; ${Date.now() - s}ms`)
  })

  renderStream.on('error', err => {
    throw err
  })
})
~~~

这里过程有点复杂TAT，可以看到，服务器在收到请求后，会将请求url封装成context对象，有了context就可以 renderer.renderToStream(context)，同时这个context也传入server-bundle.js的暴露函数中，router拿到context url中对应的组件，然后blabla，需要数据就preFetchData（这里我们的应用不需要获取额外数据），如果所有preFetch的promise 变为 resolve，就将store的state写入context中，这样渲染需要的所有数据就准备就绪了。

最后一步，就开始渲染，渲染成html字符串，然后通过response返回，实现了所谓高大上的SSR，服务器最终吐出了页面。。。。


### 兵线 2 客户端混合 client side hydration

client side的过程和 csr 类似，只不过vue2.0输出的是virtual dom，在挂载的时候需要进行hydration

在服务端渲染的输出中，根元素会带有server-rendered="true"的属性，当尝试向这个元素挂载 vue instance 的时候，vue就会尝试让 virtual dom 和 rendered dom 进行融合，如果两者不一致，则会尝试重新渲染，从而实现DOM内容的更新。


## 总结

以上就是我在迁移官网项目时对ssr过程的理解，很多地方理解也不深入，期待 vue2.0 的beta版本，作者能够更详细的阐明实现的细节，或者优化现有的应用架构，特别是dataFetch那一块，太多promise调用了。。。

能否有更好的实践呢? 

接下来，需要发一下测试平台，比较两个版本的性能好坏以及进一步的优化。。。

vue的实现方式很有新意，性能也可以，所以我决定 *好好学习，天天向上，早日精通React。。。^_^|||* 

## 参考

[Vue 2 服务端渲染初探](https://segmentfault.com/a/1190000006701796)

[vue-server-renderer](https://github.com/vuejs/vue/tree/next/packages/vue-server-renderer#component-caching)

[官方例子vue-hacker-news2.0](https://github.com/vuejs/vue-hackernews-2.0)
