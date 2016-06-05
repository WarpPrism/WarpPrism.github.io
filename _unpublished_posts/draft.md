### 原型对象
在javascript中，每当定义一个对象（函数）时，都会包含一些预定义的属性。其中，函数对象的一个属性就是prototype，而普通对象没有prototype，但有\__proto__属性，它指向创建它的函数的prototype属性。

**原型对象其实就是普通对象**（Function.prototype除外，它很特殊，它是函数对象，但没有prototype属性）

~~~javascript
function f1() {}
console.log(f1.prototype) //f1{}
console.log(typeof f1.prototype)  //object
console.log(typeof Function.prototype)  //function
console.log(typeof Object.prototype)  //object
console.log(Function.prototype.prototype) //undifined
~~~
可以看出f1.prototype就是函数f1的一个实例对象，函数f1在创建的时候，就将它的一个实例对象赋值给其prototype属性。即：

~~~javascript
var temp = new f1();
f1.prototype = temp;
~~~

所以Function.prototype为什么是函数对象就迎刃而解了。

~~~javascript
var temp = new Function();
Function.prototype = temp;
~~~

### 原型链
**无论普通对象还是函数对象** 都有一个\__proto__属性，它指向创建它的函数对象的prototype对象 e.g.

~~~javascript
var Person = function(name) {
  this.name = name;
}
Person.prototype.showName = function() {
  console.log(this.name);
}

var xiaoming = new Person("xiaoming");
xiaoming.showName();

console.log(xiaoming.__proto__ === Person.prototype); //true
console.log(Person.prototype.__proto__ === Object.prototype); //true
console.log(Object.prototype.__proto__);  //null
~~~

我们把这个由\__proto__串起来一直到Object.prototype.\__proto__ === null的链叫做原型链。
所以说，**原型链的形成真正靠的是\__proto__，而不是prototype**。

原型对象prototype中都有个预定义的constructor属性，用来引用它的函数对象，这是一种循环引用。

~~~javascript
Person.prototype.constructor === Person; //true
Function.prototype.constructor === Function; //true
Object.prototype.constructor === Object; //true
~~~

所以要查找一个对象的constructor，只需找到它原型链上遇到的第一个constructor属性指向的对象。
这里加上原型链汇总图

### prototype与面向对象程序设计
虽然JavaScript是一种object-based的语言，遇到的所有东西几乎都是对象，但是它又不是一种真正的oop语言，因为没有class这个概念。、
所以要实现oop，我们需要将属性和方法封装成一个对象，即 **Encapulation**，e.g.

~~~javascript
// 新建constructor
var Cat = function(name, color) {
  this.name = name;
  this.color = color;
}
// 把不变的属性和方法放在原型对象中以节约内存
Cat.prototype.type = "猫科动物";
Cat.prototype.eat = function() {
  console.log("吃老鼠");
}

var cat1 = new Cat("cat1", "red");
var cat2 = new Cat("cat2", "blue");
console.log(cat1.eat === cat2.eat); // true
console.log(Cat.prototype.isPrototypeOf(cat1)); // true
console.log(cat1.hasOwnProperty("name")); //true
console.log(cat1.hasOwnProperty("type")); //false
console.log("name" in cat1); //true
console.log("type" in cat1); //true
console.log(cat1.__proto__ === cat2.__proto__); //true
~~~

**继承机制** e.g.

~~~javascript
var Parent = function(name) {
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log(this.name);
}

var Child = function(name, color) {
  this.name = name;
  this.color = color;
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;
Child.prototype.sayColor = function() {
  console.log(this.color);
}

var cat = new Child("cat", "white");
cat.sayName();
cat.sayColor();
console.log(cat.__proto__);
~~~

### ES6 class语法糖

~~~javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
}

class ColorPoint extends Point {
  constructor(color, x, y) {
    super(x, y);
    /* 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。*/
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
~~~
