
## 浏览器常驻的5个线程是什么？
1. GUI渲染线程
2. JavaScript引擎线程
3. 定时器触发线程setTimeout，setInterval
4. http异步请求线程
5. 事件触发线程

## 从输入一个Url到浏览器渲染显示页面，中间都发生了什么？
1. 浏览器开启一个线程处理这个url请求，然后通过DNS服务将Url域名转换为IP地址。DNS的过程包括DNS缓存查询，递归查询和迭代查询，DNS服务器分为根服务器（root）、顶级域DNS服务器（.com, .org, .cn）、和权威DNS服务器（baidu.com, google.com等）。其中顶级域也称为一级域，权威DNS也称为二级域DNS。DNS查询细节参考[这里](http://blog.sina.com.cn/s/blog_4078ccd60101cj6r.html)。

2. 拿到服务器IP之后，便开始建立TCP连接，通过三次握手（SYN, SYN|ACK, ACK）建立TCP连接。

3. TCP连接建立之后，浏览器便开始发送HTTPGet请求，请求位于服务器上的资源，如html、css、js、img等，当服务器返回状态200时，就表示请求成功。关于Http详情，可参考：[这里](http://kb.cnblogs.com/page/130970/)。

4. 客户端每下载一个资源，都要进行http请求，这样依次构建HTML DOM Tree，CSSOM Tree，Render Tree，然后执行layout和paint操作。其中js脚本的加载和执行会阻塞dom的加载（asyn和defer除外），因为脚本可能会修改dom结构。css一般不会操作dom，所以css的加载不会影响dom加载，但有可能影响js的加载和执行。所以最佳实践是csslink放在head标签内，script标签放在body标签的最底部。不过，现在浏览器一般使用了prefatch优化，即提前并行下载css，js等资源，但并不执行，因为执行顺序存在着依赖关系。

Render Tree Example

![Contruct RenderTree](http://img2.tuicool.com/7jUBJr.png!web)

## 请谈谈你对雅虎军规和前端性能优化的理解？
1. 减少http请求，合并图片（css sprites），合并css，js，但要考虑合并后文件的体积。
2. 使用CDN （Content Deliver Network）
3. 为文件头指定Expires或Cache-Control，使内容具有缓存性。区分静态内容和动态内容，避免以后不必要的http请求
4. 避免空的src和href，特别是script、link、img、iframe标签
5. 使用gzip来压缩文件
6. css放在head标签内，js放在body标签底部
7. 尽可能的使用Get来完成ajax请求
8. 减少DOM元素个数
9. favicon.icon要尽可能小且可缓存
10. 配置Etags，（实体标签）用于判断浏览器中缓存内容和服务器中是否一致，比last-modified date更加灵活的机制。


## 总结

PS：要好好复习一下计网的知识了，我可是交了学费的，不能把知识还给老师啊。
