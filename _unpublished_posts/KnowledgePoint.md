## pm2

pm2是一个带有负载均衡功能的node应用的进程管理器。
主要特性：

1. 内建负载均衡，使用node cluster集群模块。
2. 后台运行
3. 无停机更新重载
4. 停止不稳定的进程
5. 控制台监测

下面是pm2控制的两个node进程示例：

~~~
┌─────────────────┬────┬─────────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name        │ id │ mode    │ pid  │ status │ restart │ uptime │ memory      │ watching │
├─────────────────┼────┼─────────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ ds-front-server │ 0  │ cluster │ 5236 │ online │ 0       │ 15m    │ 32.074 MB   │ disabled │
│ ds-front-server │ 1  │ cluster │ 5245 │ online │ 0       │ 15m    │ 31.906 MB   │ disabled │
└─────────────────┴────┴─────────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
~~~

## Nginx

Ngin是一个高性能Http服务器和反向代理服务器，在大负载情况下表现十分的优秀。
Nginx由内核和模块组成，内核非常小巧，完成的工作也比较的简单，通过查找配置文件，将客户端请求映射到一个location block（location是Nginx配置中的一个指令，用于URL匹配），而在location中配置的每个指令将启动不同的模块去完成相应的工作。

Nginx模块从功能上可以分为三类：

1. Handlers（处理器模块）。此类模块直接处理请求，并进行输出内容和修改headers信息等操作。Handlers处理器模块一般只能有一个。
2. Filters （过滤器模块）。此类模块主要对其他处理器模块输出的内容进行修改操作，最后由Nginx输出。
3. Proxies （代理类模块）。此类模块是Nginx的HTTP Upstream之类的模块，这些模块主要与后端一些服务比如FastCGI等进行交互，实现服务代理和负载均衡等功能。

下图简单说明了Nginx的工作过程：

![Nginx Process](http://img1.51cto.com/attachment/201310/190640632.png)

Nginx常用命令

~~~
nginx -c /etc/nginx/nginx.conf // 启动并指定配置文件
nginx -s reload // 运行时重载配置文件
nginx -s stop // 运行时快速关闭nginx
nginx -s quit // 运行时优雅关闭nginx
~~~

## git

下图中，四个仓库区域分别是 工作区，暂存区，本地仓库，远程仓库。箭头则是git常用的命令。

![git outline](http://yanhaijing.com/blog/146.png)

> [git笔记](http://yanhaijing.com/git/2014/11/01/my-git-note/)

