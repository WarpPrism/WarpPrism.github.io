
### JavaScript RegExp对象
RegExp是正则表达式的缩写,可以根据正则匹配模式(pattern) 通过new关键字来创建.
创建语法:

~~~javascript
new RegExp(pattern, attributes)
~~~

attributes 可以取i(匹配时大小写不敏感), g(全剧匹配), m(多行匹配)
RegExp有三个方法,分别是:

1. RegExp.test(str), 检验str是否存在pattern定义的字符串,返回true和false
2. RegExp.exec(str), 同上,返回的是匹配到的结果或null
3. RegExp.compile(str), 该方法用于改变匹配模式

~~~javascript
var pattern = new RegExp("ain", "g");
var str = "The rain in Spain stays mainly in the plain";
console.log(pattern.ignoreCase); // 看是否具有标志 i false
console.log(pattern.global);  // 看是否具有标志 g true

// 不具备标志g的pattern不能使用 lastIndex属性，该属性返回的是上次匹配到字符串
// 紧邻的下一个位置
if (pattern.global) {
    console.log(pattern.test(str));
    console.log(pattern.lastIndex); // 8
    pattern.test(str);
    console.log(pattern.lastIndex); // 17
}
console.log(pattern.source); //ain
~~~

### 常用正则格式
- [adgk]            查找括号内的任意字符
- [^adgk]           查找__非__括号内的任意字符
- .                 查找任意单个字符，除了换行和结束符
- n+                匹配至少1个或多个n的字符串
- n*                0个或多个
- n?                0个或1个
- n{X, Y}           匹配含有X～Y个n的序列的字符串
- n$                匹配以n结尾的字符串
- ^n                匹配以n开头的字符串
- \d                查找数字
- \D                查找非数字字符
- \s                查找空白字符
- \S                查找非空白字符

### 常用的匹配模式
- 正整数            /^[1-9]\d*$/
- 负整数            /^-[1-9]\d*$/
- 整数              /^-?[1-9]\d*$/
- 浮点数            /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/
- 非负浮点数        /[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/
- 中文字符          /[\u4e00-\u9fa5]/
- 空白行            /\n\s*\r/
- HTML标签          /<(\S*?)[^>]*>.*?</\1>|<.*? />/
- 匹配首尾空白字符                  /^\s*|\s*$/
- Email                             /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/                   
- 简单URL                           /[a-zA-Z]+://[^\s]*/
- 15位或18位身份证                  /\d{15}|\d{18}/
- ip格式                            /\d+\.\d+\.\d+\.\d/
- 验证是否含有^%&',;=?$\"等字符     /[^%&',;=?$\x22]+/

[更多](http://www.codefans.net/articles/915.shtml)
