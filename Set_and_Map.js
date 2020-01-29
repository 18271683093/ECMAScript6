//set
//ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
// Set本身是一个构造函数，用来生成 Set 数据结构。

{
    const s = new Set();
    [2, 3, 4, 5, 6, 2, 3].forEach(x => s.add(x));
    for (let i of s) {
        // console.log(i)
    }
    // console.log(s)
}
{
    class mSet extends Array {
        constructor() {
            super()
        }
        add (y) {
            console.log(this)
            console.log(this.length)
            if (this.every(x => x !== y)) {
                this[this.length] = y;
            }
            console.log(this)
            console.log(this.length)
        }
        push () {

        }
    }
    var a = new mSet();
    // a.add(1)
    // a.add(2)
}

//Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化
{
    // 例一
    const set = new Set([1, 2, 3, 4, 4]);
    [...set]
    // [1, 2, 3, 4]
}
{
    // 例二
    const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
    items.size // 5

}
{

    // 例三
    const set = new Set(document.querySelectorAll('div'));
    set.size // 56
}
{
    // 类似于
    const set = new Set();
    document
        .querySelectorAll('div')
        .forEach(div => set.add(div));
    // set.size // 56
}
// 上面代码也展示了一种去除数组重复成员的方法。
{
    // 去除数组的重复成员
    [...new Set([1, 2, 1, 3])];
    // 去除字符串里面的重复字符。
    [...new Set('ababbc')].join('')
}


// Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
// Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// Set.prototype.clear()：清除所有成员，没有返回值。


// 遍历操作
// Set 结构的实例有四个遍历方法，可以用于遍历成员。

// Set.prototype.keys()：返回键名的遍历器
// Set.prototype.values()：返回键值的遍历器
// Set.prototype.entries()：返回键值对的遍历器
// Set.prototype.forEach()：使用回调函数遍历每个成员
{
    let set = new Set(['red', 'green', 'blue']);

    for (let item of set.keys()) {
        // console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set.values()) {
        // console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set.entries()) {
        // console.log(item);
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]
}
//Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
{
    Set.prototype[Symbol.iterator] === Set.prototype.values
}
//这意味着，可以省略values方法，直接用for...of循环遍历 Set。
{
    let set = new Set(['red', 'green', 'blue']);

    for (let x of set) {
        // console.log(x);
    }
    // red
    // green
    // blue
}
//因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
{
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);

    // 并集
    let union = new Set([...a, ...b]);
    // Set {1, 2, 3, 4}

    // 交集
    let intersect = new Set([...a].filter(x => b.has(x)));
    // set {2, 3}

    // 差集
    let difference = new Set([...a].filter(x => !b.has(x)));
}

// WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

// 首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
// 作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。


{
    const a = [[1, 2], [3, 4]];
    const ws = new WeakSet(a);
    // WeakSet {[1, 2], [3, 4]}
}
//注意，是a数组的成员成为 WeakSet 的成员，而不是a数组本身。这意味着，数组的成员只能是对象。

// WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
// WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
// WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

// WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

{
    const foos = new WeakSet()
    class Foo {
        constructor() {
            foos.add(this)
        }
        method () {
            if (!foos.has(this)) {
                throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
            }
        }
    }
}
// 上面代码保证了Foo的实例方法，只能在Foo的实例上调用。这里使用 WeakSet 的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。


// Map 
// JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

{
    const data = {};
    const element = document.getElementById('myDiv');

    data[element] = 'metadata';
    data['[object HTMLDivElement]'] // "metadata"
}

// 上面代码原意是将一个 DOM 节点作为对象data的键，但是由于对象只接受字符串作为键名，所以element被自动转为字符串[object HTMLDivElement]。
// 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。
{
    const m = new Map();
    const o = { p: 'Hello World' };

    m.set(o, 'content')
    m.get(o) // "content"

    m.has(o) // true
    m.delete(o) // true
    m.has(o) // false
}
// 上面代码使用 Map 结构的set方法，将对象o当作m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。

// 上面的例子展示了如何向 Map 添加成员。作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
{
    const map = new Map([
        ['name', '张三'],
        ['title', 'Author']
    ]);

    map.size // 2
    map.has('name') // true
    map.get('name') // "张三"
    map.has('title') // true
    map.get('title') // "Author"
}
//Map构造函数接受数组作为参数，实际上执行的是下面的算法。
{
    const items = [
        ['name', '张三'],
        ['title', 'Author']
    ];

    const map = new Map();

    items.forEach(
        ([key, value]) => map.set(key, value)
    );
}
//如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
{
    let map = new Map();

    map.set(-0, 123);
    map.get(+0) // 123

    map.set(true, 1);
    map.set('true', 2);
    map.get(true) // 1

    map.set(undefined, 3);
    map.set(null, 4);
    map.get(undefined) // 3

    map.set(NaN, 123);
    map.get(NaN) // 123
}
// Map 结构原生提供三个遍历器生成函数和一个遍历方法。

// Map.prototype.keys()：返回键名的遍历器。
// Map.prototype.values()：返回键值的遍历器。
// Map.prototype.entries()：返回所有成员的遍历器。
// Map.prototype.forEach()：遍历 Map 的所有成员。
{
    const map = new Map([
        ['F', 'no'],
        ['T', 'yes'],
    ]);

    for (let key of map.keys()) {
        // console.log(key);
    }
    // "F"
    // "T"

    for (let value of map.values()) {
        // console.log(value);
    }
    // "no"
    // "yes"

    for (let item of map.entries()) {
        // console.log(item[0], item[1]);
    }
    // "F" "no"
    // "T" "yes"

    // 或者
    for (let [key, value] of map.entries()) {
        // console.log(key, value);
    }
    // "F" "no"
    // "T" "yes"

    // 等同于使用map.entries()
    for (let [key, value] of map) {
        // console.log(key, value);
    }
    // "F" "no"
    // "T" "yes"
}
//上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
{
    // map[Symbol.iterator] === map.entries
    // true
}
//Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
{
    const map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ]);

    [...map.keys()];
    // [1, 2, 3]

    [...map.values()];
    // ['one', 'two', 'three']

    [...map.entries()];
    // [[1,'one'], [2, 'two'], [3, 'three']]

    [...map];
    // [[1,'one'], [2, 'two'], [3, 'three']]
}
//结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
{
    const map0 = new Map()
        .set(1, 'a')
        .set(2, 'b')
        .set(3, 'c');

    const map1 = new Map(
        [...map0].filter(([k, v]) => k < 3)
    );
    // 产生 Map 结构 {1 => 'a', 2 => 'b'}

    const map2 = new Map(
        [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
    // 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
}

// 此外，Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
{
    const map = new Map()
        .set(1, 'a')
        .set(2, 'b')
        .set(3, 'c');
    map.forEach(function (value, key, map) {
        // console.log("Key: %s, Value: %s", key, value);
    });
}
// forEach方法还可以接受第二个参数，用来绑定this。
{
    const map = new Map()
        .set(1, 'a')
        .set(2, 'b')
        .set(3, 'c');
    const reporter = {
        report: function (key, value) {
            // console.log("Key: %s, Value: %s", key, value);
        }
    };

    map.forEach(function (value, key, map) {
        this.report(key, value);
    }, reporter);
}
// 上面代码中，forEach方法的回调函数的this，就指向reporter。

//与其他数据结构的互相转换 § ⇧
{
    // Map 转为数组   
    const myMap1 = new Map()
        .set(true, 7)
        .set({ foo: 3 }, ['abc']);
    [...myMap1]
    // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
    // 数组 转为 Map
    const myMap2 = new Map()
        .set(true, 7)
        .set({ foo: 3 }, ['abc']);
    [...myMap2]
    // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
    // Map 转为对象
    function strMapToObj (strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    const myMap3 = new Map()
        .set('yes', true)
        .set('no', false);
    strMapToObj(myMap3)
    // { yes: true, no: false }
    //对象转为 Map
    function objToStrMap (obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }

    objToStrMap({ yes: true, no: false })
    // Map {"yes" => true, "no" => false}
    // Map 转为 JSON
    function strMapToJson (strMap) {
        return JSON.stringify(strMapToObj(strMap));
    }

    let myMap = new Map().set('yes', true).set('no', false);
    strMapToJson(myMap)
    // '{"yes":true,"no":false}'
    // 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
    function mapToArrayJson (map) {
        return JSON.stringify([...map]);
    }

    let myMap4 = new Map().set(true, 7).set({ foo: 3 }, ['abc']);
    mapToArrayJson(myMap4)
    // '[[true,7],[{"foo":3},["abc"]]]'
    // JSON 转为 Map，正常情况下，所有键名都是字符串。
    function jsonToStrMap (jsonStr) {
        return objToStrMap(JSON.parse(jsonStr));
    }

    jsonToStrMap('{"yes": true, "no": false}')
    // Map {'yes' => true, 'no' => false}
    // 但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
    function jsonToMap (jsonStr) {
        return new Map(JSON.parse(jsonStr));
    }

    jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
    // Map {true => 7, Object {foo: 3} => ['abc']}
}


// WeakMap结构与Map结构类似，也是用于生成键值对的集合。
// 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
{
    const wm = new WeakMap();

    const element = document.getElementById('example');

    wm.set(element, 'some information');
    wm.get(element) // "some information"
}
//WeakMap 的另一个用处是部署私有属性。
{
    const _counter = new WeakMap();
    const _action = new WeakMap();

    class Countdown {
        constructor(counter, action) {
            _counter.set(this, counter);
            _action.set(this, action);
        }
        dec () {
            let counter = _counter.get(this);
            if (counter < 1) return;
            counter--;
            _counter.set(this, counter);
            if (counter === 0) {
                _action.get(this)();
            }
        }
    }

    const c = new Countdown(2, () => console.log('DONE'));

    c.dec()
    c.dec()
    // DONE 
}