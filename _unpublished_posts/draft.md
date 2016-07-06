---
layout: post
title: HTML5之Canvas —— 代码画出我的心
tags: [JavaScript]
categories: tech-post
excerpt: 本文探讨了几种常用的设计模式，总结的不是很全，因为笔者没有太多这方面的实践经验。需要完整版请参考更多资料。
---

## 前言
大二和大三期间分别作了两个小项目，Quoridor和ImageProcessor，都用到了Canvas，但当时只是为了尽快的完成项目，没有仔细总结canvas的用法，时间久了，难免遗忘，在此回顾总结一下。

[什么是Canvas呢，这是一个Demo](http://warpprism.github.io/Advanced-WFE/Canvas_Clock/)

~~~javascript
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = _w;
canvas.height = _h;
~~~

颜色，样式，阴影
~~~javascript
// 定义cxt填充模式，颜色|渐变|填充绘图
context.fillStyle=color|gradient|pattern;

// 定义笔触
context.strokeStyle=color|gradient|pattern

// 阴影 (css3 box-shadow text-shadow)
context.shadowColor = color
context.shadowBlur = number
context.shadowOffsetX = number
context.shadowOffsetY = number

// 渐变
context.createLinearGradient(x0, y0, x1, y1);
// x0,y0 渐变起始点， x1,y1 渐变终止点
context.createRadialGradient(x0, y0, r0, x1, y1, r1);
// 辐射渐变
~~~
