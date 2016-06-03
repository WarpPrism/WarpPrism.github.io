---
layout: post
title: JavaScript Prototype And OOP
tags: [JavaScript]
categories: tech-post
excerpt: 圣杯布局要求三列布局，中间宽度自适应，两边定宽，这样做的优势是重要的东西放在文档流前面可以优先渲染...
---

## 基础概念
在Javacript中，有两种类型的值，原始值和对象，原始值（primitive type）有Undifined, Null, Boolean, Number, String，一般存储在栈stack中，而对象分为普通对象和函数对象，存储在堆heap中，Object和Function是JS自带的函数对象。举例如下：

~~~ javascript
function f1() {} // 注：函数作为构造子，一般情况首字母要大写
var f2 = function() {}
var f3 = new Function('str', 'console.log(str)');

var o1 = new f1();
var o2 = {};
var o3 = new Object();

console.log(typeof(Object)); //function
console.log(typeof(Function)); //function

console.log(typeof(f1)); //function
console.log(typeof(f2)); //function
console.log(typeof(f3)); //function

console.log(typeof(o1)); //object
console.log(typeof(o2)); //object
console.log(typeof(o3)); //object
~~~
显而易见，函数对象就是通过new Function()创建出来的，Object，Function本身也是。
而普通对象则是由函数对象通过new关键字创建出来的。
