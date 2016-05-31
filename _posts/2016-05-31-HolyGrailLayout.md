---
layout: post
title: 圣杯布局和双飞翼布局
tags: [css]
categories: tech-post
excerpt: 圣杯布局要求三列布局，中间宽度自适应，两边定宽，这样做的优势是重要的东西放在文档流前面可以优先渲染...
---

## 圣杯布局 !

圣杯布局要求三列布局，中间宽度自适应，两边定宽，这样做的优势是重要的东西放在文档流前面可以优先渲染。
现在设左侧宽度为100px，右侧为200px，下面是两种实现方式：

### 传统实现
DOM结构如下所示：

~~~ html
<div class="header">Header</div>

<div class="body-wrap">
    <div class="center column">Center</div>
    <div class="left column">Left</div>
    <div class="right column">Center</div>
</div>

<div class="footer">Footer</div>
~~~
CSS样式如下：

~~~ css
body {
    text-align: center;
    margin: 0;
    padding: 0;
    /*由于中间center层是流式的，当窗口大小缩小到Lwidth+Rwidth的时候，center就没有了，所以应该给#container设置一个最小宽度*/
    min-width: 400px;
}
.header, .footer {
    width: 100%;
    clear: both;
    background-color: #dbd9d7;
}
.body-wrap {
    padding-left: 100px;
    padding-right: 200px;
    box-sizing: border-box;
}

/*三列均向左浮动，中间宽度定为100%，左右两侧利用负边距分别定位到左右两侧*/
.center {
    width: 100%;
    float: left;
    background-color: #b3d1c1;
}
.left {
    float: left;
    width: 100px;
    margin-left: -100%;
    position: relative;
    right: 100px;
    background-color: #e57b85;
}
.right {
    float: left;
    width: 200px;
    margin-left: -200px;
    position: relative;
    left: 200px;
    background-color: #f1ff2d;
}
~~~
实现效果如下：

![HolyGrailLayout](/imgs/tech_post/HolyGrail.png)

### Flex实现

~~~ css
body {
    text-align: center;
    margin: 0;
    padding: 0;
}
.header, .footer {
    background-color: #dbd9b7;
    width: 100%;
}
.body-wrap {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    flex-flow: row nowrap;
    box-sizing: border-box;
}

/*item的flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto*/
.center {
    order: 1; /* order定义item在主轴上的排序*/
    background-color: #e57b85;
    flex: auto; /*auto即 1 1 auto，表示具有伸缩性，宽度自适应*/
}
.left {
    order: 0;
    background-color: #f1ff2d;
    flex: 0 0 100px; /* 0 0 size 表示不具有伸缩性，宽度为固定size */
}
.right {
    order: 2;
    background-color: #b3d1c1;
    flex: 0 0 200px;
}
~~~

## 双飞翼布局 !

在不增加额外标签的情况下，圣杯布局已经非常完美，圣杯布局使用了相对定位，以后布局是有局限性的，而且宽度控制要改的地方也多，那么有没其他方法更加简洁方便呢？

在淘宝UED探讨下，增加多一个div就可以不用相对布局了，只用到了浮动和负边距，这就是我们所说的双飞翼布局。

DOM结构：center内层增加了一个div(.inner)

~~~ html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="./main.css"/>
</head>
<body>
    <h3>Holy Grail Layout</h3>
    <div class="header">Header</div>
    <div class="body-wrap">
        <div class="center">
            <div class="inner">Center</div>
        </div>
        <div class="left">Left</div>
        <div class="right">Right</div>
    </div>
    <div class="footer">Footer</div></body>
</html>
~~~

样式：去掉了左右栏的相对定位，去掉包裹层padding，以中间栏新增div的margin代替

~~~ css
body {
    text-align: center;
    margin: 0;
    padding: 0;
    /*由于中间center层是流式的，当窗口大小缩小到Lwidth+Rwidth的时候，center就没有了，所以应该给#container设置一个最小宽度*/
    min-width: 400px;
}
.header, .footer {
    width: 100%;
    clear: both;
    background-color: #dbd9d7;
}
.body-wrap {
    /*padding-left: 100px;
    padding-right: 200px;*/
    box-sizing: border-box;
}

/*三列均向左浮动，中间宽度定为100%，左右两侧利用负边距分别定位到左右两侧*/
.center {
    width: 100%;
    float: left;
    background-color: #b3d1c1;
}
.center .inner {
    margin-left: 100px;
    margin-right: 200px;
}
.left {
    float: left;
    width: 100px;
    margin-left: -100%;
    /*position: relative;
    right: 100px;*/
    background-color: #e57b85;
}
.right {
    float: left;
    width: 200px;
    margin-left: -200px;
    /*position: relative;
    left: 200px;*/
    background-color: #f1ff2d;
}
~~~
