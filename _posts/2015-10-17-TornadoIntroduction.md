---
layout: post
title: 开始搭建Tornado服务器
categories: tech-post
tags: [tornado, back-end]
---

### 前言 ###
最近要为中大的官方微信搭建一个网站，主要是一个查询大厅的页面，想把这个页面嵌入到iSYSU公众号上面。我们技术部讨论之后，决定采用tornado作为后端的解决方案，因为它轻量且高效，足够满足一个微信号的访问需求。而我对tornado还不是很了解，所以需要深入学习一下。

### 介绍 ###
Tornado 和现在的主流 Web 服务器框架（包括大多数 Python 的框架）有着明显的区别：它是非阻塞式服务器，而且速度相当快。得利于其非阻塞的方式和对 epoll 的运用，Tornado 每秒可以处理数以千计的连接，这意味着对于实时 Web 服务来说，Tornado 是一个理想的 Web 框架。

### 模块分析 ###
$ **IOLoop**, 基于epoll， 用来处理socket的读写事件，从而使tornado能高效率的处理高并发请求。

$ **IOStream**，用来处理 socket 的异步读写。

$ **HTTPConnection**，这个类用来处理 http 的请求，包括读取http请求头，读取post过来的数据，调用用户自定义的处理方法，以及把响应数据写给客户端socket。

具体关系如图所示：
![](/imgs/tech_post/tornado1.gif)

### 示例服务器代码 ###
在项目架构中， templates文件夹存放HTML模板文件， static文件夹存放img， css， js等等。

在下面的代码中，核心部分就是Handler， 用来处理来自客户端的get/post请求。

~~~python
import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type = int)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

def main():
    # tornado.options.parse_command_line()

    APP = tornado.web.Application(
        handlers = [("/", IndexHandler)],
        template_path = os.path.join(os.path.dirname(__file__), "templates"),
        static_path = os.path.join(os.path.dirname(__file__), "static"),
        debug = True
    )

    HTTP_SERVER = tornado.httpserver.HTTPServer(APP)
    HTTP_SERVER.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == "__main__":
    main()
~~~
