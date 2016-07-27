---
layout: post
title: HTML5之Canvas —— 代码画出我的心
tags: [JavaScript, canvas]
categories: tech-post
excerpt: 大二和大三期间分别作了两个小项目，Quoridor和ImageProcessor，都用到了Canvas，但当时只是为了尽快的完成项目，没有仔细总结canvas的用法，时间久了，难免遗忘，在此回顾总结一下。
---

### 前言和基础概念
大二和大三期间分别作了两个小项目，Quoridor和ImageProcessor，都用到了Canvas，但当时只是为了尽快的完成项目，没有仔细总结canvas的用法，时间久了，难免遗忘，在此回顾总结一下。

[Canvas有多好玩？](http://warpprism.github.io/Advanced-WFE/Canvas_Clock/)

canvas坐标系：

![横向x纵向y](/imgs/tech_post/Coordcanvas.png)

~~~javascript
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = number;
canvas.height = number;
~~~

### 颜色，样式，阴影
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
// 设置渐变的颜色
gradient.addColorStop(stop(0.0~1.0), color);
~~~

### 线条样式

~~~javascript
// 设置线段末端线帽的样式
context.lineCap = "butt|square|round";
// 设置两条线交点的样式
context.lineJoin = "round|miter|bevel";
context.lineWidth = number; //以像素计
~~~

### 矩形

~~~javascript
context.rect(x, y, width, height); // 只是定义矩形路径
context.fillRect(x, y, width, height);
context.strokeRect(x, y, width, height);
context.clearRect(x, y, width, height); // 常用来清楚canvas
~~~

### 路径和曲线
~~~javascript
// 开始路径或重置当前路径
context.beginPath();
// 将路径闭合掉，即创建从当前点回到起始点的路径
context.closePath();
context.moveTo(x, y);
context.lineTo(x, y);
context.fill();
context.stroke();

// 二次贝塞尔曲线 cpx,cpy为控制点坐标 x,y为终点坐标
context.quadraticCurveTo(cpx, cpy, x, y);

// 三次贝塞尔曲线
contetx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

// 弧形 圆心x y，半径，起始弧度，结束弧度，是否逆时针方向
context.arc(x, y, r, startAngle, endAngle, conterClockwise);
~~~

### 文字

~~~javascript
context.font = "20px Geogia";
context.textAlign = "center|start|end";
context.textBaseLine = "top|middle|bottom";
context.fillText(text, x, y, maxWidth(optional));
contetx.strokeText(text, x, y, maxWidth(optional));
~~~


