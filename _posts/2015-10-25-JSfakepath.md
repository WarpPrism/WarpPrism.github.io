---
layout: post
title: 如何引用本地文件的绝对路径（fakepath问题）
categories: tech-post
tags: [javascript]
excerpt: Some browsers have a security feature that prevents javascript from knowing your file's local full path. It makes sense - as a client, you don't want the server to know your local machine's filesystem. It would be nice if all browsers did this.
---


> Some browsers have a security feature that prevents javascript from knowing your file's local full path. It makes sense - as a client, you don't want the server to know your local machine's filesystem. It would be nice if all browsers did this.


**上代码：**

~~~javascript
var getPath = function(obj,fileQuery,transImg){
    if(window.navigator.userAgent.indexOf("MSIE")>=1){
        obj.select();
        var path=document.selection.createRange().text;
        obj.removeAttribute("src");
        obj.setAttribute("src",transImg);
        obj.style.filter=
            "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+path+"', sizingMethod='scale');";
    }
    else{
        var file =fileQuery.files[0];
        var reader = new FileReader();
        reader.onload = function(e){
            obj.setAttribute("src",e.target.result)
        };
        reader.readAsDataURL(file);
    }
};
~~~

现在我们有一个Image对象，要将该对象的src属性指向一个本地文件，就可以通过下面方法实现。
~~~html
<input type="file" id="file" />
~~~
~~~javascript
var file = document.getElementById("file");
var img = new Image();
file.click();
file.onchange = function() {
	getPath(img, this, null);
	img.onload = function() {
		// your code here.
	}
}
~~~
这样img的src就是本地文件的引用了，当然src的内容是经过加密的，浏览器很重视这方面的安全性。
如果采用下面这种做法，就会遇到fakepath问题：
~~~javascript
file.onchange = function() {

	img.src = file.value;

	img.onload = function() {
		// your code here.
	}
}
~~~

~~~
GET file:///C:/fakepath/src.jpg net::ERR_FILE_NOT_FOUND
~~~
这里fakepath就把文件的真实路径隐藏了。


> [Related Topic In Stackoverflow](http://stackoverflow.com/questions/4851595/how-to-resolve-the-c-fakepath)