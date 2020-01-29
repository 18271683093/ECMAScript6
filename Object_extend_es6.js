// 直接写入变量和函数，作为属性和方法
{
    const foo = 'bar';
    const add = (x, y) => x + y;
    const obj = { name: 'obj', foo, add };
    // console.log(obj)
}
// commonJS 模块输出一组变量，非常适合这种写法
{
    let ms = {};

    function getItem (key) {
        return key in ms ? ms[key] : null;
    }

    function setItem (key, value) {
        ms[key] = value;
    }

    function clear () {
        ms = {};
    }

    // module.exports = { getItem, setItem, clear };
    // // 等同于
    // module.exports = {
    //     getItem: getItem,
    //     setItem: setItem,
    //     clear: clear
    // };
}
// 属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
{
    const cart = {
        _wheels: 4,

        get wheels () {
            return this._wheels;
        },

        set wheels (value) {
            if (value < this._wheels) {
                throw new Error('数值太小了！');
            }
            this._wheels = value;
        }
    }

    // cart.wheels = 1;
}
// 简洁写法在打印对象时也很有用。
{
    let user = {
        name: 'test'
    };

    let foo = {
        bar: 'baz'
    };

    // console.log(user, foo)
    // {name: "test"} {bar: "baz"}
    // console.log({ user, foo })
    // {user: {name: "test"}, foo: {bar: "baz"}}
}

// 注意，简写的对象方法不能用作构造函数，会报错。
{
    const obj = {
        f1 () {
            this.foo = 'bar';
        },
        f2: function () { }
    };

    // new obj.f1() // 报错
    // new obj.f2() // 不报错
}

// 属性名称表达式
{
    let obj = {};
    // 方法一
    obj.foo = true;

    // 方法二
    obj['a' + 'bc'] = 123;
}

{
    let obj = {
        ['h' + 'ello'] () {
            return 'hi';
        }
    };

    obj.hello() // hi
}
//注意，属性名表达式与简洁表示法，不能同时使用，会报错
//注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
{
    const keyA = { a: 1 };
    const keyB = { b: 2 };

    const myObject = {
        [keyA]: 'valueA',
        [keyB]: 'valueB'
    };

    // myObject // Object {[object Object]: "valueB"} 
}
//对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
{
    let obj = { foo: 123 };
    Object.getOwnPropertyDescriptor(obj, 'foo')
    //  {
    //    value: 123,
    //    writable: true,
    //    enumerable: true,
    //    configurable: true
    //  }
}
//描述对象的enumerable属性，称为“可枚举性”，如果该属性为false，就表示某些操作会忽略当前属性。
// 目前，有四个操作会忽略enumerable为false的属性。
// for...in循环：只遍历对象自身的和继承的可枚举的属性。
// Object.keys()：返回对象自身的所有可枚举的属性的键名。
// JSON.stringify()：只串行化对象自身的可枚举的属性。
// Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

//ES6 规定，所有 Class 的原型的方法都是不可枚举的
{
    Object.getOwnPropertyDescriptor(class { foo () { } }.prototype, 'foo').enumerable
    // false
}

//属性的遍历 
// （1）for...in

// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

// （2）Object.keys(obj)

// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

// （3）Object.getOwnPropertyNames(obj)

// Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

// （4）Object.getOwnPropertySymbols(obj)

// Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

// （5）Reflect.ownKeys(obj)

// Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

// 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

// 首先遍历所有数值键，按照数值升序排列。
// 其次遍历所有字符串键，按照加入时间升序排列。
// 最后遍历所有 Symbol 键，按照加入时间升序排列。
{
    Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 })
    // ['2', '10', 'b', 'a', Symbol()]
}
// 上面代码中，Reflect.ownKeys方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。

//super 关键字 § ⇧
//我们知道，this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
{
    const proto = {
        foo: 'hello'
    };

    const obj = {
        foo: 'world',
        find () {
            return super.foo;
        }
    };

    Object.setPrototypeOf(obj, proto);
    obj.find() // "hello"
}
//注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
{
    // 报错
    // const obj = {
    //     foo: super.foo
    // }

    // // 报错
    // const obj = {
    //     foo: () => super.foo
    // }

    // // 报错
    // const obj = {
    //     foo: function () {
    //         return super.foo
    //     }
    // }
}
//JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）。
{
    const proto = {
        x: 'hello',
        foo () {
            console.log(this.x);
        },
    };

    const obj = {
        x: 'world',
        foo () {
            super.foo();
        }
    }

    Object.setPrototypeOf(obj, proto);

    // obj.foo() // "world"
}
// 上面代码中，super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。

// clone

{
    let a = {};
    let aClone1 = { ...a };
    // 等同于
    let aClone2 = Object.assign({}, a);
}
// 上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
{
    let obj = {};
    // 写法一
    const clone1 = {
        __proto__: Object.getPrototypeOf(obj),
        ...obj
    };

    // 写法二
    const clone2 = Object.assign(
        Object.create(Object.getPrototypeOf(obj)),
        obj
    );

    // 写法三
    const clone3 = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    )
}
//上面代码中，写法一的__proto__属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。
//扩展运算符可以用于合并两个对象
{
    let a = {}, b = {};
    let ab1 = { ...a, ...b };
    // 等同于
    let ab2 = Object.assign({}, a, b);
}
//如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
{
    let a = {};
    let aWithOverrides1 = { ...a, x: 1, y: 2 };
    // 等同于
    let aWithOverrides2 = { ...a, ...{ x: 1, y: 2 } };
    // 等同于
    let x = 1, y = 2, aWithOverrides3 = { ...a, x, y };
    // 等同于
    let aWithOverrides4 = Object.assign({}, a, { x: 1, y: 2 });
}
//链判断运算符 § ⇧
{
    let message = {};
    const firstName = (message
        && message.body
        && message.body.user
        && message.body.user.firstName) || 'default';
}
//这样的层层判断非常麻烦，因此 ES2020 引入了“链判断运算符”（optional chaining operator）?.，简化上面的写法。
{
    // const firstName = message ?.body ?.user ?.firstName || 'default';
    // const fooValue = myForm.querySelector('input[name=foo]') ?.value;
}
// 上面代码使用了?.运算符，直接在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。

// Object 对象的新增方法。
// ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

// ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
{
    Object.is('foo', 'foo')
    // true
    Object.is({}, {})
    // false
}
// 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
{
    +0 === -0 //true
    NaN === NaN // false

    Object.is(+0, -0) // false
    Object.is(NaN, NaN) // true
}
//ES5 可以通过下面的代码，部署Object.is。
{
    Object.defineProperty(Object, 'is', {
        value: function (x, y) {
            if (x === y) {
                // 针对+0 不等于 -0的情况
                return x !== 0 || 1 / x === 1 / y;
            }
            // 针对NaN的情况
            return x !== x && y !== y;
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
}

//Object.assign
{
    class SomeClass {
        constructor(x, y) {
            Object.assign(this, { x, y });
        }
    }

    Object.assign(SomeClass.prototype, {
        someMethod (arg1, arg2) {
        },
        anotherMethod () {
        }
    });

    // 等同于下面的写法
    SomeClass.prototype.someMethod = function (arg1, arg2) {
    };
    SomeClass.prototype.anotherMethod = function () {
    };
}

//克隆对象
{
    function clone (origin) {
        return Object.assign({}, origin);
    }
}
// 上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。

// 不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
{
    function clone (origin) {
        let originProto = Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originProto), origin);
    }
}

//合并多个对象
{
    const merge =
        (target, ...sources) => Object.assign(target, ...sources);
}
//如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。
{
    const merge =
        (...sources) => Object.assign({}, ...sources);
}
//为属性指定默认值
{
    const DEFAULTS = {
        logLevel: 0,
        outputFormat: 'html'
    };

    function processContent (options) {
        options = Object.assign({}, DEFAULTS, options);
        console.log(options);
        // ...
    }
}
//Object.getOwnPropertyDescriptors()
// ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。
{
    const obj = {
        foo: 123,
        get bar () { return 'abc' }
    };

    Object.getOwnPropertyDescriptors(obj)
    // { foo:
    //    { value: 123,
    //      writable: true,
    //      enumerable: true,
    //      configurable: true },
    //   bar:
    //    { get: [Function: get bar],
    //      set: undefined,
    //      enumerable: true,
    //      configurable: true } }
}
//该方法的实现
{
    function getOwnPropertyDescriptors (obj) {
        const result = {};
        for (let key of Reflect.ownKeys(obj)) {
            result[key] = Object.getOwnPropertyDescriptor(obj, key);
        }
        return result;
    }
}

//该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
{
    const source = {
        set foo (value) {
            console.log(value);
        }
    };

    const target1 = {};
    Object.assign(target1, source);

    Object.getOwnPropertyDescriptor(target1, 'foo')
    // { value: undefined,
    //   writable: true,
    //   enumerable: true,
    //   configurable: true }
}
// 上面代码中，source对象的foo属性的值是一个赋值函数，Object.assign方法将这个属性拷贝给target1对象，结果该属性的值变成了undefined。这是因为Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。

//这时，Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。
{
    const source = {
        set foo (value) {
            console.log(value);
        }
    };

    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
    Object.getOwnPropertyDescriptor(target2, 'foo')
    // { get: undefined,
    //   set: [Function: set foo],
    //   enumerable: true,
    //   configurable: true }
}

{
    const shallowMerge = (target, source) => Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(source)
    );
}
{
    let obj = {}
    const clone = Object.create(Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj));

    // 或者

    const shallowClone = (obj) => Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
    );
}
//Object.getOwnPropertyDescriptors()也可以用来实现 Mixin（混入）模式。
{
    function mix (object) {
        return {
            with: function () {
                var mixins = arguments;
                return [].reduce.call(mixins, function (c, mixin) {
                    return Object.create(c, Object.getOwnPropertyDescriptors(mixin))
                }, object)
            }
        }
    }
    let a = { a: 'a' };
    let b = { b: 'b' };
    let c = { c: 'c' };
    let d = mix(c).with(a, b);
}
{
    let mix = (object) => ({
        with: (...mixins) => mixins.reduce(
            (c, mixin) => Object.create(
                c, Object.getOwnPropertyDescriptors(mixin)
            ), object)
    });

    // multiple mixins example
    let a = { a: 'a' };
    let b = { b: 'b' };
    let c = { c: 'c' };
    let d = mix(c).with(a, b);

    d.c // "c"
    d.b // "b"
    d.a // "a"   
}

//上面代码返回一个新的对象d，代表了对象a和b被混入了对象c的操作。

//Object.setPrototypeOf() § ⇧
{
    // 格式
    // Object.setPrototypeOf(object, prototype)

    // 用法
    const o = Object.setPrototypeOf({}, null);
}
// 该方法等同于下面的函数。
{
    function setPrototypeOf (obj, proto) {
        obj.__proto__ = proto;
        return obj;
    }
}
// 下面是一个例子。
{
    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);

    proto.y = 20;
    proto.z = 40;

    obj.x // 10
    obj.y // 20
    obj.z // 40
}


//如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
{
    Object.setPrototypeOf(1, {}) === 1 // true
    Object.setPrototypeOf('foo', {}) === 'foo' // true
    Object.setPrototypeOf(true, {}) === true // true

}

//由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。

//Object.getPrototypeOf() § ⇧
//该方法与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
{
    // Object.getPrototypeOf(obj);
}

{
    function Rectangle () { }
    const rec = new Rectangle();
    // console.log(Object.getPrototypeOf(rec) === Rectangle.prototype);// true
    Object.setPrototypeOf(rec, Object.prototype)
    // console.log(Object.getPrototypeOf(rec) === Rectangle.prototype);// false
}
//Object.keys()，Object.values()，Object.entries() § ⇧
//ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
{
    var obj = { foo: 'bar', baz: 42 };
    Object.keys(obj)
    // ["foo", "baz"] 
}
//ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。
{
    let { keys, values, entries } = Object;
    let obj = { a: 1, b: 2, c: 3 };

    for (let key of keys(obj)) {
        // console.log(key); // 'a', 'b', 'c'
    }

    for (let value of values(obj)) {
        // console.log(value); // 1, 2, 3
    }

    for (let [key, value] of entries(obj)) {
        // console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
    }
}

//Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
{
    const obj = { foo: 'bar', baz: 42 };
    Object.values(obj)
    // ["bar", 42]  
}
{
    const obj = { 100: 'a', 2: 'b', 7: 'c' };
    Object.values(obj)
    // ["b", "c", "a"]
}
// 上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。

// Object.values只返回对象自身的可遍历属性。
{
    const obj = Object.create({}, { p: { value: 42 } });
    Object.values(obj) // []
}
{
    const obj = Object.create({}, {
        p:
        {
            value: 42,
            enumerable: true
        }
    });
    Object.values(obj) // [42]
}
//Object.values会过滤属性名为 Symbol 值的属性。
{
    Object.values({ [Symbol()]: 123, foo: 'abc' });
    // ['abc'] 
}
{
    Object.values('foo')
    // ['f', 'o', 'o']
}
//Object.entries方法的另一个用处是，将对象转为真正的Map结构。
{
    const obj = { foo: 'bar', baz: 42 };
    const map = new Map(Object.entries(obj));
    map // Map { foo: "bar", baz: 42 } 
}
//实现Object.entries方法
{
    // Generator函数的版本
    function* entries (obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    }
}
{
    // 非Generator函数的版本
    function entries (obj) {
        let arr = [];
        for (let key of Object.keys(obj)) {
            arr.push([key, obj[key]]);
        }

        return arr;
    }
}

//Object.fromEntries() § ⇧
//Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
{
    Object.fromEntries([
        ['foo', 'bar'],
        ['baz', 42]
    ])
    // { foo: "bar", baz: 42 }
}
//该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。
{
    // 例一
    const entries = new Map([
        ['foo', 'bar'],
        ['baz', 42]
    ]);

    Object.fromEntries(entries)
    // { foo: "bar", baz: 42 }

    // 例二
    const map = new Map().set('foo', true).set('bar', false);
    Object.fromEntries(map)
    // { foo: true, bar: false }  
}

//该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。
{
    Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
    // { foo: "bar", baz: "qux" }  
}