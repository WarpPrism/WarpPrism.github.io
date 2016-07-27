
## 浏览器常驻的5个线程是什么？
1. GUI渲染线程
2. JavaScript引擎线程
3. 定时器触发线程setTimeout，setInterval
4. http异步请求线程
5. 事件触发线程

## 从输入一个Url到浏览器渲染显示页面，中间都发生了什么？
1. 浏览器开启一个线程处理这个url请求，然后通过DNS服务将Url域名转换为IP地址。DNS的过程包括DNS缓存查询，递归查询和迭代查询，DNS服务器分为根服务器（root）、顶级域DNS服务器（.com, .org, .cn）、和权威DNS服务器（baidu.com, google.com等）。其中顶级域也称为一级域，权威DNS也称为二级域DNS。DNS查询细节参考[这里](http://blog.sina.com.cn/s/blog_4078ccd60101cj6r.html)。

2. 拿到服务器IP之后，便开始建立TCP连接，通过三次握手（SYN, SYN|ACK, ACK）建立TCP连接。

3. TCP连接建立之后，浏览器便开始发送HTTPGet请求，请求位于服务器上的资源，如html、css、js、img等，当服务器返回状态200时，就表示请求成功。关于Http详情，可参考：[这里](http://kb.cnblogs.com/page/130970/)。

4. 客户端每下载一个资源，都要进行http请求，这样依次构建HTML DOM Tree，CSSOM Tree，Render Tree，然后执行layout和paint操作。其中js脚本的加载和执行会阻塞dom的加载（asyn和defer除外），因为脚本可能会修改dom结构。css一般不会操作dom，所以css的加载不会影响dom加载，但有可能影响js的加载和执行。所以最佳实践是csslink放在head标签内，script标签放在body标签的最底部。不过，现在浏览器一般使用了prefatch优化，即提前并行下载css，js等资源，但并不执行，因为执行顺序存在着依赖关系。

Render Tree Example

![Contruct RenderTree](http://img2.tuicool.com/7jUBJr.png!web)

## 请谈谈你对雅虎军规和前端性能优化的理解？
1. 减少http请求，合并图片（css sprites），合并css，js，但要考虑合并后文件的体积。
2. 使用CDN （Content Deliver Network）
3. 为文件头指定Expires或Cache-Control，使内容具有缓存性。区分静态内容和动态内容，避免以后不必要的http请求
4. 避免空的src和href，特别是script、link、img、iframe标签
5. 使用gzip来压缩文件
6. css放在head标签内，js放在body标签底部
7. 尽可能的使用Get来完成ajax请求
8. 减少DOM元素个数
9. favicon.icon要尽可能小且可缓存
10. 配置Etags，（实体标签）用于判断浏览器中缓存内容和服务器中是否一致，比last-modified date更加灵活的机制。
11. [More On Yacent's Blog](https://www.zybuluo.com/yacent/note/370110)

## 谈谈requestAnimationFrame原理，以及你知道的其他前端动画方法
The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint.

requestAnimationFrame(callback fn)的核心原理是__递归__，即在update函数内部递归调用requestAnimationFrame(update)，从而完成动画。它是为浏览器专门设计的动画API，当窗口处于未激活状态时，动画会自动停止，降低了CPU开销。

其他实现动画的方法：CSS3 animation @keyframes || CSS3 transition: all 1s ease-in-out 0.5s; || setInterval setTimeout draw() update() loop()模式 || jQuery 动画API || canvas 等等。

## 解释下闭包
闭包可以理解为函数中定义的函数，由于存在作用域链，内层函数可以访问外层函数的变量，那么内层函数就可以实时的对那个变量进行操作，而如果把这个内层函数当作返回值的话，那么外层函数的外部就可以突破作用域限制访问那个变量。常见的用法有循环中循环变量的获取等等。

## 写一下快速排序

~~~javascript
function quickSort(arr) {
  if (Object.prototype.toString.call(arr) != "[object Array]") {
    return;
  }
  if (arr.length <= 1) {
    return arr;
  }
  var middle = Math.floor(arr.length / 2);
  var pivot = arr.splice(middle, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return quickSort(left).concat([pivot], quickSort(right));
}
~~~

## 那再写一下二分搜索

~~~javascript
function binarySearch(arr, target) {
  if (Object.prototype.toString.call(arr) != "[object Array]") {
    return;
  }
  // arr前提要是从小到大排列的数组
  arr = quickSort(arr);
  var bottom = 0;
  var top = arr.length - 1;
  var position;
  
  while (bottom < top) {
    var middle = Math.floor((bottom + top) / 2);
    if (arr[middle] == target) {
      position = middle;
      console.log("Find target at position: " + position);
      return position;
    } else if (arr[middle] < target) {
      bottom = middle + 1;
    } else if (arr[middle] > target) {
      top = middle;
    }
  }
  
  return position;
}
~~~

## 写一个fibonacci数列函数0， 1， 1， 2， 3....

~~~javascript
var fibonacci = (function f(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  else {
    return f(n - 2) + f(n - 1);
    // or: return arguments.callee(n - 2) + arguments.callee(n - 1);
  }
});

fibonacci(3);
~~~

## 用查表法改进上述算法

好的，查表，查表，查表。。。

~~~javascript
var f_result = [];
var fibonacci = (function fn(n) {
  if (n == 0) return 0;
  if (n == 1) return 1;
  if (f_result[n]) {
    return f_result[n];
  } else {
    f_result[n] = fn(n - 2) + fn(n - 1);
    return f_result[n];
  }
});
~~~

## 实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制

~~~javascript
// method 1
function clone(obj) {
  var result;
  if (Object.prototype.toString.call(obj) == "[object Array]") {
    result = [];
    for (var i = 0; i < obj.length; i++) {
      result[i] = clone(obj[i]);
    }
    return result;
  } else if (Object.prototype.toString.call(obj) == "[object Object]") {
    result = {};
    for (var key in obj) {
      result[key] = clone(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
}
// method 2 (for object or array)
Object.prototype.clone = function() {
  var o = (this.constructor == Array) ? [] : {};
  for (var i in this) {
    o[i] = (typeof(this[i]) == "object") ? this[i].clone() : this[i];
  }
  return o;
}
~~~

## 数组去重

~~~javascript
Array.prototype.unique = function() {
  var hash = {};
  var result = [];
  for(var i = 0; i < this.length; i++) {
    var t = this[i];
    if (!hash[t]) {
      result.push(t);
      hash[t] = true;
    }
  }
  return result;
}

var a = [1, 1, 2, 2, 3, 4, 4, 5, 7, 9, 9].unique();
a;
~~~

