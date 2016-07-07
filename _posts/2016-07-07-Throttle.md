---
layout: post
title: JS函数节流原理分析
tags: [JavaScript]
categories: tech-post
excerpt: javascript 函数节流 是一种提升函数执行性能的方法。采用setTimeout定时器的方法，每次调用的时候，会清除已经存在的定时器，并建立一个新的定时器覆盖原来的，从而使函数执行时间重置。
---

javascript 函数节流 是一种提升函数执行性能的方法。


问题来源：

如果一个函数在短时间内被频繁调用，比如说 scroll, mousemove, click等事件的回调函数，最终会挤满js的**回调函数队列**。
因此就会造成性能问题或者重复的ajax请求。

解决思路：

采用setTimeout定时器的方法，每次调用的时候，会清除已经存在的定时器，并建立一个新的定时器覆盖原来的，从而使函数执行时间重置。
如果一直触发这个函数，函数的执行期就会无限拖延，除非停止触发。停止触发之后，函数才会在setTimeout规定的delay之后得以执行。

#### 例一

下面是一个按钮点击的例子：

~~~javascript
// example
var throttle = function(fn, delay) {
  if (fn.timer) {
    clearTimeout(fn.timer);
  }
  fn.timer = setTimeout(function(){
    fn.call();
  }, delay)
}

function fn() {
  console.log("clicked");
}

btn = document.getElementById("btn");
btn.addEventListener("click", function(e) {
  throttle(fn, 1000);
}, false);
~~~

上述例子在执行的时候，我们可以连续多次的点击按钮，都不会执行fn函数，只有当我们停止点击一段时间（这里是1s）后，fn才最终执行
输出clicked！

#### 例二

有时候我们有这样的需求：既不想频繁的调用函数，又想要这个函数在一定时间内定期执行一次，该怎么做呢，我们可以采用一个mustRun变量，
当定时器经过了mustRun规定的时间时，就必须调用这个函数，代码如下：

~~~javascript
var throttle = function(fn, delay, mustRun) {
    var timer;
    var now;
    var previous;
    
    return function() {
        now = +new Date();
        var context = this;
        if (!previous) {previous = now}
        
        var delta = now - previous;
        if (mustRun && delta >= mustRun) {
            fn.apply(context, arguments);
            previous = now;
        } else {
            window.clearTimeout(timer);
            timer = setTimeout(function(){
                console.log("This is delay!");
                fn.apply(context, arguments);
            }, delay);
        }
    };
}

var time = +new Date();
function fn() {
    console.log("Window Scroll at:" + (+new Date() - time));
}

window.onscroll = throttle(fn, 2000, 5000);
~~~

上述例子中，我们不断滚动浏览器窗口，则fn函数在5s内必定执行一次，当我们停止滚动，fn在经过2s的延迟后又会执行一次。

#### 总结
JS 函数节流是一种行之有效的性能改善方法，从而改善交互体验。




