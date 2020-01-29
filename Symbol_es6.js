//注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
{
    let s1 = Symbol();
    let s2 = Symbol();

    s1 === s2 // false
}
{
    // 有参数的情况
    let s1 = Symbol('foo');
    let s2 = Symbol('foo');

    s1 === s2 // false
}
//Symbol 值不能与其他类型的值进行运算，会报错。
{
    let sym = Symbol('My symbol');

    // "your symbol is " + sym;
    // TypeError: can't convert symbol to string
    // `your symbol is ${sym}`
    // TypeError: can't convert symbol to string
}
//但是，Symbol 值可以显式转为字符串。
{
    let sym = Symbol('My symbol');

    String(sym) // 'Symbol(My symbol)'
    sym.toString() // 'Symbol(My symbol)'
}
//另外，Symbol 值也可以转为布尔值，但是不能转为数值。
{
    let sym = Symbol();
    Boolean(sym);// true
    !sym;//false
    if (sym) {
        // ...
    }

    // Number(sym) // TypeError
    // sym + 2 // TypeError
}

//创建 Symbol 的时候，可以添加一个描述。
{
    const sym = Symbol('foo');
}
//但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法
{
    const sym = Symbol('foo');

    String(sym) // "Symbol(foo)"
    sym.toString() // "Symbol(foo)"
}
//上面的用法不是很方便。ES2019 提供了一个实例属性description，直接返回 Symbol 的描述。
{
    const sym = Symbol('foo');

    sym.description // "foo"
}
//Symbol.for()，Symbol.keyFor() § ⇧

//有时，我们希望重新使用同一个 Symbol 值，Symbol.for()方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。
{
    let s1 = Symbol.for('foo');
    let s2 = Symbol.for('foo');

    s1 === s2 // true
}
//Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。
{
    Symbol.for("bar") === Symbol.for("bar")
    // true

    Symbol("bar") === Symbol("bar")
    // false
}
//Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。
{
    let s1 = Symbol.for("foo");
    Symbol.keyFor(s1) // "foo"

    let s2 = Symbol("foo");
    Symbol.keyFor(s2) // undefined
}
// 上面代码中，变量s2属于未登记的 Symbol 值，所以返回undefined。

// 注意，Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
{
    function foo () {
        return Symbol.for('bar');
    }

    const x = foo();
    const y = Symbol.for('bar');
    // console.log(x === y); // true
}
//Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。
{
    iframe = document.createElement('iframe');
    iframe.src = String(window.location);
    document.body.appendChild(iframe);

    iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
}

//实例：模块的 Singleton 模式 § ⇧
// Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。

// 对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？

// 很容易想到，可以把实例放到顶层对象global。
{
    function require (path) { return {} };
    let global = {}, module = {};

    {
        // mod.js
        function A () {
            this.foo = 'hello';
        }

        if (!global._foo) {
            global._foo = new A();
        }

        module.exports = global._foo;
    }

    //然后，加载上面的mod.js。
    {

        const a = require('./mod.js');
        // console.log(a.foo);
    }
    //上面代码中，变量a任何时候加载的都是A的同一个实例。
    //但是，这里有一个问题，全局变量global._foo是可写的，任何文件都可以修改。
    {
        global._foo = { foo: 'world' };

        const a = require('./mod.js');
        // console.log(a.foo);
    }
    //为了防止这种情况出现，我们就可以使用 Symbol。
    {
        // mod.js
        const FOO_KEY = Symbol.for('foo');

        function A () {
            this.foo = 'hello';
        }

        if (!global[FOO_KEY]) {
            global[FOO_KEY] = new A();
        }

        module.exports = global[FOO_KEY];
    }
    //上面代码中，可以保证global[FOO_KEY]不会被无意间覆盖，但还是可以被改写。
    {
        global[Symbol.for('foo')] = { foo: 'world' };

        const a = require('./mod.js');
    }
    //如果键名使用Symbol方法生成，那么外部将无法引用这个值，当然也就无法改写。
    {
        const FOO_KEY = Symbol('foo');
    }

}

//Symbol.species § ⇧
//对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。
{
    class MyArray extends Array {
    }

    const a = new MyArray(1, 2, 3);
    const b = a.map(x => x);
    const c = a.filter(x => x > 1);

    b instanceof MyArray // true
    c instanceof MyArray // true
}

//上面代码中，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象。你可能会认为，b和c都是调用数组方法生成的，所以应该是数组（Array的实例），但实际上它们也是MyArray的实例。
//Symbol.species属性就是为了解决这个问题而提供的。现在，我们可以为MyArray设置Symbol.species属性。
{
    class MyArray extends Array {
        static get [Symbol.species] () { return Array; }

    }
}
//上面代码中，由于定义了Symbol.species属性，创建衍生对象时就会使用这个属性返回的函数，作为构造函数。这个例子也说明，定义Symbol.species属性要采用get取值器。默认的Symbol.species属性等同于下面的写法。
{
    // static get[Symbol.species]() {
    //     return this;
    // }
}

{
    class MyArray extends Array {
        static get [Symbol.species] () { return Array; }
    }

    const a = new MyArray();
    const b = a.map(x => x);

    b instanceof MyArray // false
    b instanceof Array // true
}
// 上面代码中，a.map(x => x)生成的衍生对象，就不是MyArray的实例，而直接就是Array的实例。

// 再看一个例子。
{
    class T1 extends Promise {
    }

    class T2 extends Promise {
        static get [Symbol.species] () {
            return Promise;
        }
    }

    new T1(r => r()).then(v => v) instanceof T1 // true
    new T2(r => r()).then(v => v) instanceof T2 // false
}
//上面代码中，T2定义了Symbol.species属性，T1没有。结果就导致了创建衍生对象时（then方法），T1调用的是自身的构造方法，而T2调用的是Promise的构造方法。
//Symbol.iterator
//对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
{
    const myIterable = {};
    myIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    };

    [...myIterable] // [1, 2, 3]
}
// 对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器，详细介绍参见《Iterator 和 for...of 循环》一章。
{
    class Collection {
        *[Symbol.iterator] () {
            let i = 0;
            while (this[i] !== undefined) {
                yield this[i];
                ++i;
            }
        }
    }

    let myCollection = new Collection();
    myCollection[0] = 1;
    myCollection[1] = 2;

    for (let value of myCollection) {
        // console.log(value);
    }
    // 1
    // 2
}