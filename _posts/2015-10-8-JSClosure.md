---
layout: post
title: JavaScript Closure
tags: closure javascript script
categories: tech-notes
---

在JS中，当内部的方法被其他对象引用，如果内部的方法使用了外部方法的变量，将造成外部方法无法释放，变量将被保持，此时将形成闭包。

看一个例子

~~~html
<a href="#" id="closureTest1">闭包测试1</a><br />
<a href="#" id="closureTest2">闭包测试2</a><br />
<a href="#" id="closureTest3">闭包测试3</a><br />
~~~

~~~javascript
function closureTest(){
    for (var i = 1; i < 4; i++) {
       var element = document.getElementById('closureTest' + i);
       element.onclick = function(){
            alert(i);
        }
    }
}
~~~

此时无论点击哪个超链接，弹出的都是`3`，这是因为onclick触发时，绑定函数才会去初始化`i`的值，而`i`引用自外部函数`closureTest`，在closureTest中，`i`早已递增到3。


解决办法很简单，不闭包就行了。

~~~javascript
function badClosureExample(){
   for (var i = 1; i <4; i++) {
       var element = document.getElementById('closureTest' + i);
       element.onclick =  clickCall(i);
   }
}

function clickCall(j){
    return function(){
        alert('您单击的是第' + j + '个链接');
    }
}
~~~

闭包也并非全然有害，有时我们也可以利用做些有趣的事，例如定时任务的传参

~~~javascript
function bind(){
    var element = document.getElementById('closureTest0');
    element.onclick = function(){
        setTimeout(function(p){
            return function(){
                alert(p);
            }
        }('998'), 1000); //延迟1秒弹出提示
    }
}
~~~
