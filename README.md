## 基于React的iPhone主题博客网站

#### 简介
我以前的博客主题是基于jekyll的，代码依然保存在该Repo下的old-theme分支，但后我想，无论是什么类型的模板，它都是基于github提供的git page服务，方便开发者搭建静态的Web页面，那我为何不用正在学的React框架来搭建一个定制程度更高的主题网站呢？当作练手也是笔稳赚不亏的买卖，于是乎就有了现在的代码。

#### 技术架构
- Yeoman的React-Webpack脚手架(略作修改)
- React 负责所有Web组件
- React-router 路由切换，组件切换
- 蚂蚁金服Antd的一些React组件
- Webpack 项目打包
- H5,CSS3,ES6

#### 主要项目结构
~~~
src
---- images
---- components (所有React组件)
    ---- app (ios应用)
    ---- iphone (ios UI组件)
    ---- common (通用组件)
---- styles （组件对应样式）
---- libs (js库)
~~~

#### 定制开发

- cd至项目目录，运行npm install
- 修改cfg／defaults.js的publicPath属性为devPublicPath，如下：

~~~javascript
const devPublicPath = '/assets/';
const buildPublicPath = './assets/';

module.exports = {
  srcPath: srcPath,
  publicPath: devPublicPath,
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
~~~

- 运行npm run start

#### build并发布至github page

- 修改cfg／defaults.js的publicPath属性为buildPublicPath
- npm run build
- git add -A
- git commit -m "update"
- git push origin master
