---
layout: post
title: 常用的Javacript设计模式
tags: [JavaScript]
categories: tech-post
excerpt: 本文探讨了几种常用的设计模式，总结的不是很全，因为笔者没有太多这方面的实践经验。需要完整版请参考更多资料。
---

## 一. 单例模式
所谓单例模式，就是为一个类创建**唯一的**一个实例。
但JS是一种无类语言，只能说创建一个唯一的对象{}，这个对象具有独一无二的功能。

比如页面上唯一一个遮罩层mask，就可以这样实现：

#### 闭包实现

~~~javascript
var createMask = function() {
    var mask;
    return function() {
        return mask || 
        (mask = document.body.appendChild(document.createElement("div")));
    }
}()
var m = createMask();
console.log(m);
~~~

#### 桥接模式实现（函数可以作为参数传入）

~~~javascript
var singleton = function(fn) {
    var obj;
    return function() {
        console.log(this, arguments);
        return obj || (obj = fn.apply(this, arguments));
    }
}

var createMask = singleton(function() {
    return document.body.appendChild(document.createElement('div'));
});
console.log(createMask());
~~~


## 二. 观察者模式
又称作发布-订阅模式，发布者发布信息事件，而订阅者**主动监听**信息事件，并执行后续的函数。一般情况下，
发布者和订阅者为同一对象。

> 观察者模式可以很好的实现模块间的解耦。

代码如下：

~~~javascript
function Observer() {
    this.handlers = {};
}
Observer.prototype = {
    constructor: Observer,
    listen: function(event, handler) {
        if (typeof this.handlers[event] == "undefined" || !this.handlers[event]) {
            console.log("Add new handler type: " + event);
            this.handlers[event] = [];
        }
        this.handlers[event].push(handler);
    },
    trigger: function(event, data=null) {
        if (typeof this.handlers[event] == "undefined" || !this.handlers[event]) {
            console.log("Observer has no such event: " + event);
            return;
        } else {
            for (var i = 0; i < this.handlers[event].length; i++) {
                this.handlers[event][i](data);
            }
        }
    },
    remove: function(event, handler) {
        var handlers = this.handlers[event];
        if (Object.prototype.toString.call(handlers) == "[object Array]") {
            for (var i = 0; i < handlers.length; i++) {
                if (handlers[i] === handler) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }
};
// Test
var Message = new Observer();
Message.listen("ready", function() {
    console.log("Hello World!");
});

Message.listen("ready", function(data) {
    if (!data) {
        console.log("Good Night!");
    } else {
        console.log("Good Night! " + data);
    }
});
Message.trigger("not_ready");

Message.trigger("ready", "XiaoMing");
~~~


## 参考

[常用的Javascript设计模式](http://blog.jobbole.com/29454/)





