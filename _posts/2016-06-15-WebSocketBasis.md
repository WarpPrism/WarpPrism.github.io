---
layout: post
title: HTML5之WebSocket
tags: [JavaScript]
categories: tech-post
excerpt: WebSocket是HTML5提出的新标准之一，被称为“web的TCP”，它的出现方便了实时web应用的开发。
---

### 基本概念
**WebSocket** 是HTML5提出的新标准之一，被称为“web的TCP”，它的出现方便了实时web应用的开发。所谓实时web应用就是指服务器和客户端之间通信频繁的应用，比如在线游戏，在线证券，实时聊天系统等等，传统的request-response模式是无法实现实时web应用的，这种情况下，客户端得到的信息往往是过时的。
> **MDN:**  WebSockets is an advanced technology that makes it possible to open an interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.

在websocket出现以前，开发人员想要实现实时web应用的开发，只能采取一些折衷的方案，主要有：

- 轮询（polling）
- Comet
  - 长轮询
  - 流

**轮询：** 最古老的方法，客户端以一定的时间间隔发送请求，通过频繁请求的方式保持连接。缺点是当服务器没有数据更新的时候，多余的请求会占据网络带宽。

**长轮询：** 当服务器端没有数据更新的时候，连接会保持一段时间周期直到数据或状态改变或者时间过期，通过这种机制来减少无效的客户端和服务器间的交互。当然，如果服务端的数据变更非常频繁的话，这种机制和定时轮询比较起来没有本质上的性能的提高。

**流：** 流技术方案通常就是在客户端的页面使用一个隐藏的窗口向服务端发出一个长连接的请求。服务器端接到这个请求后作出回应并不断更新连接状态以保证客户端和服务器端的连接不过期。

综合以上方法，可以发现它们都是用ajax方式进行的模拟长连接，实质上每次连接都是HTTP过程，自然每一次都包含类似的HTTP header，造成了冗余。

而websocket就是为了取代轮询和Comet，它本质上是一种TCP连接，因此在连接稳定性，传输数据量方面都有着性能优势。

### WebSocket连接建立过程

- 客户端向服务器发送**特定的HTTP请求**，即握手阶段。

~~~
客户端到服务端：
GET /demo HTTP/1.1
Host: example.com
Connection: Upgrade // 表明需要升级协议
Sec-WebSocket-Key2: 12998 5 Y3 1 .P00
Upgrade: WebSocket
Sec-WebSocket-Key1: 4@1 46546xW%0l 1 5
Origin: http://example.com
[8-byte security key]

服务端到客户端：
HTTP/1.1 101 WebSocket Protocol Handshake
Upgrade: WebSocket
Connection: Upgrade
WebSocket-Origin: http://example.com
WebSocket-Location: ws://example.com/demo
[16-byte hash response]
~~~

- 服务器端解析头信息，并在握手的过程中依据这些信息生成一个16位的安全密钥并返回给客户端，以表明服务器端获取了客户端的请求，同意创建WebSocket 连接。
- 客户端和服务器进行全双工通信（full-duplex）。
- 其中一方关闭连接

### WebSocket的JS接口

~~~javascript
var ws_server_url = "ws://localhost:8888/Demo";
var mysocket = new WebSocket(ws_server_url);
mysocket.onopen = function(e) {
  console.log("ws_server is ready for message!");
  mysocket.send("Hello World!");
}
mysocket.onmessage = function(e) {
  console.log(e.data);
}
mysocket.onerror = function(e) {
  console.log(e.data);
}
mysocket.onclose = function(e) {
  console.log("ws_server closed.");
}
mysocket.close();
~~~



### 参考链接
[HTML5 WebSocket 简介](http://www.ibm.com/developerworks/cn/web/1112_huangxa_websocket/)

[WebSocket的JavaScript例子](http://www.xyhtml5.com/websocket-javascript-example.html)
