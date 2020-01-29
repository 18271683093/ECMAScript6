// 赋初值
function log1 (x = 1, y = { a: 1 }) {
    console.log(x)
    console.log(y)
}

function log2 ({ a } = { a: 1 }) {
    console.log(a)
} // 如果传空对象 娶不到默认值 不传可以

function log3 ({ a = 1, b = 2 }) {
    console.log(a)
    console.log(b)
}//如果不传对象 报错  
//上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。如果函数foo调用时没提供参数，变量x和y就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。
function log4 ({ a = 1, b = 2 } = {}) {
    console.log(a)
    console.log(b)
} // ojbk
function Point (x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

const p = new Point();
// p // { x: 0, y: 0 }

// 另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。
let x = 99;
function foo (p = x + 1) {
    console.log(p);
}
// foo() // 100
x = 100;
// foo() // 101


// 函数的 length 属性
//指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
(function (a) { }).length;// 1
(function (a = 5) { }).length; // 0
(function (a, b, c = 5) { }).length;// 2
// 上面代码中，length属性的返回值，等于函数的参数个数减去指定了默认值的参数个数。比如，上面最后一个函数，定义了 3 个参数，其中有一个参数c指定了默认值，因此length属性等于3减去1，最后得到2。
// 这是因为length属性的含义是，该函数预期传入的参数个数。某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了。同理，后文的 rest 参数也不会计入length属性
(function (...args) { }).length;// 0
// 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
(function (a = 0, b, c) { }).length;// 0
(function (a, b = 1, c) { }).length;// 1

// 作用域
// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
/*
var x = 1;

function f (x, y = x) {
    console.log(y);
}

f(2) // 2

*/

// 上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

// 再看下面的例子。

/*
let x = 1;

function f (y = x) {
    let x = 2;
    console.log(y);
}

f() // 1
*/
// 上面代码中，函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。

/* 上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。

如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。请看下面的例子。

let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); // outer


如果写成下面这样，就会报错。

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar() // ReferenceError: foo is not defined
上面代码中，匿名函数里面的foo指向函数外层，但是函数外层并没有声明变量foo，所以就报错了。

下面是一个更复杂的例子。

var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
上面代码中，函数foo的参数形成一个单独作用域。这个作用域里面，首先声明了变量x，然后声明了变量y，y的默认值是一个匿名函数。这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是同一个作用域，所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。

如果将var x = 3的var去除，函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，所以最后输出的就是2，而外层的全局变量x依然不受影响。

var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1 */

/*
应用
利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。
*/
function throwIfMissing () {
    throw new Error('Missing parameter');
}

function foo (mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
}

foo('a')
/*
// Error: Missing parameter
上面代码的foo函数，如果调用的时候没有参数，就会调用默认值throwIfMissing函数，从而抛出一个错误。

从上面代码还可以看到，参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（注意函数名throwIfMissing之后有一对圆括号），这表明参数的默认值不是在定义时执行，而是在运行时执行。如果参数已经赋值，默认值中的函数就不会运行。

另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。

function foo(optional = undefined) { ··· }
*/

// reset 参数
function add (...values) {
    let sum = 0;
    for (var val of values) {
        sum += val
    }

    return sum;
}

add(2, 5, 3) // 10

// arguments变量的写法
function sortNumbers1 () {
    return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers2 = (...numbers) => numbers.sort();

// 下面是一个利用 rest 参数改写数组push方法的例子。
function push (array, ...items) {
    items.forEach(function (item) {
        array.push(item);
        // console.log(item);
    });
}

var a = [];
push(a, 1, 2, 3);
// 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

// 函数的length属性，不包括 rest 参数。
(function (a) { }).length; // 1
(function (...a) { }).length;// 0
(function (a, ...b) { }).length; // 1

/*
严格模式
从 ES5 开始，函数内部可以设定为严格模式。

function doSomething(a, b) {
  'use strict';
  // code
}
ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

// 报错
function doSomething(a, b = a) {
  'use strict';
  // code
}

// 报错
const doSomething = function ({a, b}) {
  'use strict';
  // code
};

// 报错
const doSomething = (...a) => {
  'use strict';
  // code
};

const obj = {
  // 报错
  doSomething({a, b}) {
    'use strict';
    // code
  }
};
这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。

// 报错
function doSomething(value = 070) {
  'use strict';
  return value;
}

两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。

'use strict';

function doSomething(a, b = a) {
  // code
}
第二种是把函数包在一个无参数的立即执行函数里面。

const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());


*/

// 需要注意的是，ES6 对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5 的name属性，会返回空字符串，而 ES6 的name属性会返回实际的函数名。

var f = function () { };

// ES5
f.name // ""

// ES6
f.name // "f"

// 如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。

const bar = function baz () { };

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"


foo.bind({}).name; // "bound foo"

(function () { }).bind({}).name;  // "bound "

//箭头函数

{
    var f = v => v;
    //等同于
    var f = function (v) {
        return v;
    }
}

{
    var f = () => 5;
    //等同于
    var f = function () { return 5; }

    var sum = (num1, num2) => num1 + num2
    //等同于
    var sum = function (num1, num2) { return num1 + num2 }
}
// 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
{
    var sum = (num1, num2) => { return num1 + num2; }
}
//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
{
    // 报错
    // var getTempItem = id => { id: id, name: "Temp" };

    // 不报错
    var getTempItem = id => ({ id: id, name: "Temp" });
    var foo = () => { a: 1 };
    // console.log(foo())  // undefined
}

// 上面代码中，原始意图是返回一个对象{ a: 1 }，但是由于引擎认为大括号是代码块，所以执行了一行语句a: 1。这时，a可以被解释为语句的标签，因此实际执行的语句是1;，然后函数就结束了，没有返回值。

//如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
{
    let fn = () => void doesNotReturn();
}
// 箭头函数可以与变量解构结合使用。
{
    var full = ({ first, last }) => first + ' ' + last;

    // 等同于
    var full = function (person) {
        return person.first + ' ' + person.last;
    }
}

{
    const isEven = n => n % 2 === 0;
    const square = n => n * n;
    // 正常函数写法
    var values = [1, 2, 3];
    [1, 2, 3].map(function (x) {
        return x * x;
    });

    // 箭头函数写法
    [1, 2, 3].map(x => x * x);
    // 正常函数写法
    var result = values.sort(function (a, b) {
        return a - b;
    });

    // 箭头函数写法
    var result = values.sort((a, b) => a - b);

    const numbers = (...nums) => nums;

    numbers(1, 2, 3, 4, 5)
    // [1,2,3,4,5]

    const headAndTail = (head, ...tail) => [head, tail];

    headAndTail(1, 2, 3, 4, 5)
}
/*
使用注意点
箭头函数有几个使用注意点。

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

 */

{
    function Timer () {
        this.s1 = 0;
        this.s2 = 0;
        // 箭头函数
        setInterval(() => this.s1++, 1000);
        // 普通函数
        setInterval(function () {
            this.s2++;
        }, 1000);
    }

    var timer = new Timer();

    // setTimeout(() => console.log('s1: ', timer.s1), 3100);
    // setTimeout(() => console.log('s2: ', timer.s2), 3100);
    var handler = {
        id: '123456',

        init: function () {
            document.addEventListener('click',
                event => this.doSomething(event.type), false);
        },

        doSomething: function (type) {
            console.log('Handling ' + type + ' for ' + this.id);
        }
    };

    // ES6
    function foo () {
        setTimeout(() => {
            console.log('id:', this.id);
        }, 100);
    }

    // ES5
    function foo () {
        var _this = this;

        setTimeout(function () {
            console.log('id:', _this.id);
        }, 100);
    }
}

// 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
{
    function foo () {
        setTimeout(() => {
            console.log('args:', arguments);
        }, 100);
    }

    // foo(2, 4, 6, 8)
    // args: [2, 4, 6, 8]
}
// 另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
{
    (function () {
        return [
            (() => this.x).bind({ x: 'inner' })()
        ];
    }).call({ x: 'outer' });
}


//不适用场合 

// 第一个场合是定义对象的方法，且该方法内部包括this。

{
    const cat = {
        lives: 9,
        jumps: () => {
            this.lives--;
            console.log(this)
        }
    }
    const handler = {
        event: function () {
            console.log(this);
            cat.jumps();
        }
    }
    // cat.jumps()
    // handler.event();
}
// 上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。

//第二个场合是需要动态this的时候，也不应使用箭头函数。
{
    var button = document.getElementById('press');
    button.addEventListener('click', () => {
        this.classList.toggle('on');
    });
}
// 上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

// 嵌套的箭头函数
// 箭头函数内部，还可以再使用箭头函数。下面是一个 ES5 语法的多重嵌套函数。

{
    function insert (value) {
        return {
            into: function (array) {
                return {
                    after: function (afterValue) {
                        array.splice(array.indexOf(afterValue) + 1, 0, value);
                        return array;
                    }
                };
            }
        };
    }
}

// insert(2).into([1, 3]).after(1); //[1, 2, 3]
// 上面这个函数，可以使用箭头函数改写。
{

    let insert = (value) => ({
        into: (array) => ({
            after: (afterValue) => {
                array.splice(array.indexOf(afterValue) + 1, 0, value);
                return array;
            }
        })
    });

    // insert(2).into([1, 3]).after(1); //[1, 2, 3]
}

// 下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。
{
    const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val);
    const plus1 = a => a + 1;
    const mult2 = a => a * 2;
    const addThenMult = pipeline(plus1, mult2);
    // console.log(addThenMult(5))

    function pipelineEs5 () {
        var funcs = arguments;
        return function (val) {
            return [].reduce.call(funcs, function (a, b) {
                return b(a)
            }, val)
        }
    }
    // var addThenMultEs5 = pipelineEs5(plus1, mult2);
    // console.log(addThenMultEs5(5))
}
//如果觉得上面的写法可读性比较差，也可以采用下面的写法
{
    const plus1 = a => a + 1;
    const mult2 = a => a * 2;

    // mult2(plus1(5))
}

// 箭头函数还有一个功能，就是可以很方便地改写 λ 演算。

{
    // λ演算的写法
    // fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)));

    // // ES6的写法
    // var fix = f => (x => f(v => x(x)(v)));
    // (x => f(v => x(x)(v)));
}

// 尾调用优化
//尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
//我们知道，函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。
//尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

// 尾递归
//函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
//递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。
{
    function factorial (n) {
        if (n === 1) return 1;
        return n * factorial(n - 1);
    }

    // factorial(5) // 120
}
// 上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 。

// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

{
    function factorial (n, total) {
        if (n === 1) return total;
        return factorial(n - 1, n * total);
    }

    // factorial(5, 1) // 120
}
//非尾递归
{
    function Fibonacci (n) {
        if (n <= 1) { return 1 };

        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }

    // Fibonacci(10) // 89
    // Fibonacci(100) // 超时
    // Fibonacci(500) // 超时
}
// 尾递归
{
    function Fibonacci2 (n, ac1 = 1, ac2 = 1) {
        if (n <= 1) { return ac2 };
        return Fibonacci2(n - 1, ac2, ac1 + ac2);
    }

    // Fibonacci2(100) // 573147844013817200000
    // Fibonacci2(1000) // 7.0330367711422765e+208
    // Fibonacci2(10000) // Infinity
}

//递归函数的改写
//尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。比如上面的例子，阶乘函数 factorial 需要用到一个中间变量total，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？
//两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。
{
    function tailFactorial (n, total) {
        if (n === 1) return total;
        return tailFactorial(n - 1, n * total);
    }

    function factorial (n) {
        return tailFactorial(n, 1);
    }

    // factorial(5) // 120
}
// 上面代码通过一个正常形式的阶乘函数factorial，调用尾递归函数tailFactorial，看起来就正常多了。

// 函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。
{
    function currying (fn, n) {
        return function (m) {
            return fn.call(this, m, n);
        };
    }

    function tailFactorial (n, total) {
        if (n === 1) return total;
        return tailFactorial(n - 1, n * total);
    }

    // const factorial = currying(tailFactorial, 1);

    // factorial(5) // 120
}
// 第二种方法就简单多了，就是采用 ES6 的函数默认值。
{
    function factorial (n, total = 1) {
        if (n === 1) return total;
        return factorial(n - 1, n * total);
    }

    // factorial(5) // 120  
}
// 总结一下，递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。对于其他支持“尾调用优化”的语言（比如 Lua，ES6），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归


//严格模式
//ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
// 这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
// func.arguments：返回调用时函数的参数。
// func.caller：返回调用当前函数的那个函数。
//尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

{
    function restricted () {
        'use strict';
        restricted.caller;    // 报错
        restricted.arguments; // 报错
    }
    // restricted();
}

//尾递归优化的实现
//尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的，就是自己实现尾递归优化。

// 它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

{
    function sum (x, y) {
        if (y > 0) {
            return sum(x + 1, y - 1);
        } else {
            return x;
        }
    }

    // sum(1, 100000)
}
// 上面代码中，sum是一个递归函数，参数x是需要累加的值，参数y控制递归次数。一旦指定sum递归 100000 次，就会报错，提示超出调用栈的最大次数。

// 蹦床函数（trampoline）可以将递归执行转为循环执行。
{
    function trampoline (f) {
        while (f && f instanceof Function) {
            f = f();
        }
        return f;
    }
}
// 上面就是蹦床函数的一个实现，它接受一个函数f作为参数。只要f执行后返回一个函数，就继续执行。注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。

// 然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。

{
    function sum (x, y) {
        if (y > 0) {
            return sum.bind(null, x + 1, y - 1);
        } else {
            return x;
        }
    }
}

// 上面代码中，sum函数的每次执行，都会返回自身的另一个版本。

// 现在，使用蹦床函数执行sum，就不会发生调用栈溢出。

{
    // trampoline(sum(1, 100000))
}

// 蹦床函数并不是真正的尾递归优化，下面的实现才是。
{
    function tco (f) {
        var value;
        var active = false;
        var accumulated = [];
        var count = 1;
        var whilecount = 1;

        return function accumulator () {
            accumulated.push(arguments);
            console.log("count:" + count++);

            if (!active) {
                active = true;
                console.log('enter active')
                while (accumulated.length) {
                    // 循环调用一个函数
                    // 闭包 公用一个accumulated做参数判断
                    // 执行后 value
                    console.log(' ------ start ------ ')
                    value = f.apply(this, accumulated.shift());
                    console.log(value)
                    console.log(' ------ e n d ------ ')

                }
                console.log('leave active')
                active = false;
                return value;
            }

            return "accumulator"
        };
    }

    var sum = tco(function (x, y) {
        console.log('f.apply')
        if (y > 0) {
            return sum(x + 1, y - 1)
        }
        else {
            return x
        }
    });


    var sum1 = function (x, y) {
        if (y > 0) {
            return sum1(x + 1, y - 1)
        }
        else {
            return x
        }
    }
    var sum2 = tco(function (x, y) {
        if (x > 0) {
            return sum2(x - 1, y + x)
        }
        else {
            return y
        }
    })

    sum(1, 10)


    console.log(sum2(10, 0))
}