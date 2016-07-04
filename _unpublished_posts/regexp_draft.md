
JavaScript RegExp对象
RegExp是正则表达式的缩写,可以根据正则匹配模式(pattern) 通过new关键字来创建.
创建语法:

~~~javascript
new RegExp(pattern, attributes)
~~~

RegExp有三个方法,分别是:

1. RegExp.test(str), 检验str是否存在pattern定义的字符串,返回true和false
2. RegExp.exec(str), 同上,返回的是匹配到的结果或null
3. RegExp.
