
最近有参加两次前端实习生面试，这里总结一下被问到的问题，尤其是自己欠缺的部分。

## 互动派 数据产品部

我是在8.4号投的简历，没想到20分钟之后就收到了通知面试的电话，约好第二天上午10点面试，效率真的很高。

第二天挤地铁，猎德站下了之后又走20分钟就到了公司，作为实习面试者看着进进出出的IT白领们，还是略感压力和紧张的，验证了学生证件，领了访问权二维码，就忐忑不安的上了大楼，心里却想着中午要吃什么。。。。 pia，进入正题

### 笔试部分

前台mm从资料库拿了一份，一共8道题，分别是（1）cookie、sessionStorage、localStorage的区别，（2）window.onload 与 $(document).ready()的区别，（3）数组去重算法，（4）如何实现拖拽列表排序，（5）提取url中查询字符串，并返回对象，（6）this问题，（7）一道性能优化相关的问题，（8）position属性有哪些值，意思分别是什么

__1 关于this的那道题，由于马虎，所以做错了。题目如下：__

~~~javascript
// 解释下面代码的运行情况
var x = 1;
var foo = {
	x: 2,
	getX: function() {
		var x = 3;
		console.log(this.x);
	}
};

~function() {
	console.log(x); // undefined
	var x = 4;
	foo.getX(); // 2
	foo.getX.call(null); // 1
	foo.getX.call(this); // 1
}();
~~~

首先，要理解\~function(){}()的写法，这其实是一种比较hack的写法，等同于(function(){})()，即IIFE模式，function前面加上~，+，-，^等操作符，解析的时候就会立即触发。

第一个console.log是undefined，因为存在 __变量声明提升__。

第二个foo.getX(); getX函数的执行上下文为foo对象，this == foo。

第三处，将null设为函数执行上下文时，默认设置为window对象，this == window。

第四处，this指向调用IIFE的对象，这里是window，所以还是this == window。

__2 另一道题，提取url查询字符串，并以对象形式返回__

~~~javascript
// sample url
var s = "http://codepen.io/WarpPrism/collections/public/?name=xiaoming&todo=getout";

var handleQuery = function(str) {
	if (!str) {
		str = window.location.href; // get current page-url
		// str = window.location + ''; 这是当时我的写法，不太确定，结果竟然对了
	}
	var obj = {};
	var queryStr = str.split('?')[1];
	var allQuerys = queryStr.split('&');
	allQuerys.forEach(function(item) {
		var key = item.split('=')[0];
		var value = item.split('=')[1];
		obj[key] = value;
	});

	console.log(obj);
	return obj;
}

handleQuery(s);
~~~

__3 如何实现拖拽列表排序__

这一部分我回答的思路是li元素设置为绝对定位，通过监听mousedown, mousemove, mouseup事件来实现拖拽排序，但这种方式不是最佳实践，用Html5的拖拽API实现起来更加的方便，而且用h5的话，逼格较高，给面试官的第一印象会比较好。

可以查看这里：[codepen demo](http://codepen.io/WarpPrism/pen/jAZRpx?editors=0010)

至于其他的笔试题，都是很常见的，有很多资料可以查阅，这里就不再累述了。

### 一面部分

一面我的是一个华工的师兄，在看我笔试题的时候会指出我其中的一些错误，不会的地方还耐心指点，让我一开始的紧张感瞬间没有了，而后师兄又仔细的看了看简历，问了些项目相关的问题。

__1 移动设备上的分辨率问题你是怎么解决的？__

这个问题源于官微那边的h5小游戏，项目搁置太久，依稀记得用的cocosjs的API，所以不太确定。只是答，将游戏的分辨率设置为游戏背景图片的分辨率，保持一致，图片是传设院给的，所以开发时遵循于游戏设计。

(知乎上相关的回答)[https://www.zhihu.com/question/35221839]

__2 了解跨域吗？实现跨域的方式有哪些？__

跨域的目的是为了突破浏览器的同域安全策略，使得这个域可以访问其它域上的资源文件，所谓同域即要求端口相同 && 协议相同 && 域名相同。

实现方式有 JSONP, CORS, iframe, websocket协议，其中JSONP是通过callback(JSON data)的形式实现，即JSON with padding，CORS跨域资源共享，克服ajax同源使用的限制，并且支持所有的HTTP请求，一般需要支持CORS的服务器。

__3 web安全知识__

不造，去看[yacent的博客](https://www.zybuluo.com/yacent/note/448612)，发现有下面两个知识点：

__4 Promise 和 jQuery deffered__

__5 哦，小伙子好像很了解ES6嘛，说一说吧！__

......

了解的不多，比如let声明，箭头函数，generator，promise，class等等。。。

看来还是要多刷刷ES6了，面试过程中关于这个新标准问的挺多的。

__6 有没有读过框架或类库的源码？jQuery， Bootstrap什么的？__

__7 了解模块化吗？谈谈你的理解__

模块化是软件工程项目的一种设计思想，目的是为了实现高内聚，低耦合，模块之间存在依赖关系。对于纯面向对象语言如C++，java等，构造class就可以封装一个模块。而对于js而言，有很多方式可以实现模块化，常见的标准有，nodejs的commonJS模式，通过require语句实现服务端的同步加载，客户端则有异步加载方式AMD和CMD。

[前端模块化](http://www.cnblogs.com/dolphinX/p/4381855.html)

当然还有webpack, browserify等模块加载器，作为模块加载的工具也都是比较好用的。

师兄：还可以，我挺满意的，喝杯水，我去给你安排二面。: )

### 二面部分

这样，一面结束了，喝口水压压惊先，不过一想到二面将是技术大牛来面我，心里真是忐忑不安。果然来的是一位稍大点的师兄，一看就很聪明，几句交谈下来，发现师兄真的是思维敏捷，知识面宽泛，滔滔不绝，感觉自己很难跟的上师兄的思路，ok，主要面试内容如下：

__1 在chrome dev tool或firebug中，我们经常可以看到相应的状态码，不知你是否留意？__

有，我经常使用chrome devTool，在network一栏中可以查看

__1.1 好，现在有200， 304， 200 from cache三种状态，解释下它们的区别__

200 OK，请求成功，成功收到服务器响应

304 Not Modified，本地缓存与服务器资源一致，没有修改过，所以使用缓存资源

from cache 200 ...

__1.2 按照你的理解，304和from cache有什么区别__


__2 OK，你曾经用nodeJS写过小项目，规模是怎样的？__

学生作品，规模不是很大，小型的MVC框架application，前端基于React渲染前端组件，通过ajax与后端交互，后端基于采用nodejs的Express框架 + mongoDB noSQL database。

__3 要知道，nodeJS在4.0版本的时候已经支持ES6语法了，对此你有什么了解？__

还是ES6的相关问题

__4 Promise对象，它如何处理异常？__

__5 __

### 总结

本以为二面回答的很差会被刷的时候，第二天HR姐姐就打来电话说技术面通过了，还是很令我吃惊的，不过也挺开心的，毕竟有实习offer了。

团队内部采用Vue.js/jQuery/Bootstrap/nodeJS/ECharts/Webpack 等技术栈作为解决方案，所以可能对组件化，模块化方面有一定的要求，主要工作是造轮子，构造可复用的组件和模块，相信，随着进一步的学习，我会逐步适应开发过程的。


## 4399 移动端web开发方向

