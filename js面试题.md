# javascript 有哪些数据类型
  string, number, boolean, undefined, null, object, array; **es6新增：symbol,bigInt;**
  原始数据类型：undefined，null，boolean，string，number
  引用数据类型：object， array， function
  ### 区别
    存储位置不同，原始数据类型存储在栈里面，占用空间小，大小固定 ；引用数据类型存储在堆里面，占用空间大，大小不固定，引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始位置

# 数据类型检测方式
  typeof           // typeof '123' == 'string'
  instanceof       // 判断对象的类型  [] instanceof Array  原理是 通过原型链查找
  constructor      // (2).constructor === Number  **注意:如果创建一个对象来改变他的原型，constructor就不能判断数据类型了**

# 判断数组方法
  Array.isArray([]) , instanceof, 原型链判断：[].__proto__ === Array.prototype;

# null 和 undefined 区别
  undefined 代表未定义 声明变量但没有赋值，null代表空对象

# typeof null 的结果，原因？
  typeof null === 'object'   在js第一个版本中 null的类型标签与object的类型标签 一样都是 000

# instanceof 操作符的实现原理
  基于原型链，判断构造函数的prototype属性是否出现在对象的原型链中的任何位置

# 0.1 + 0.2 != 0.3
  计算机通过二进制存储数据，当计算 0.1 + 0.2 的时候其实是计算两个数的二进制的和，转换十进制就是0.30000000004

# isNaN 和 Number.isNaN 函数的区别
  isNan 函数接收参数后，会尝试将参数转为数值，任何不能被转为数值的的值都会被返回 true ，非数值也会返回true;
  Number.isNaN 会首先判断传入参数是不是数字，然后在判断是否为NaN；

# let const var 三者区别..

  let const 具有块级作用域。块级作用域解决了 es5 中 内层变量覆盖外部变量，用来计数的循环变量泄漏为全局变量；
  var 存在变量提升；
  var 声明的变量为全局变量，并且将该变量添加为全局对象的属性；
  var 声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的；let const 不允许重复声明；
  暂时性死区：let const 声明变量之前，该变量都是不可用的；var 声明的变量不存在暂时性死区；
  var let 声明变量时可以不定义初始值，const 必须设置初始值；
  let var 创建的变量可以更该指针指向(重新赋值)，const 声明的变量不允许改变 指针指向；

# askjhd