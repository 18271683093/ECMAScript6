// 扩展运算符
// 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
{
    // console.log(...[1, 2, 3])
    // 1 2 3

    // console.log(1, ...[2, 3, 4], 5)
    // 1 2 3 4 5

    // console.log([...document.querySelectorAll('div')])
    // [<div>, <div>, <div>]

    function push (array, ...item) {
        // console.log(item)
        array.push(...item)
    }
    function add (x, y) {
        return x + y
    }
    const numbers = [4, 30];
    const sNumbers = [...numbers];

    push(numbers, 4, 5, 6)
    // console.log(numbers)
    numbers.push(4, 5, 8)
    // console.log(numbers)
    function f (v, w, x, y, z) { }
    const args = [0, 1];
    f(-1, ...args, 2, ...[3]);
    var x = 1
    const arr = [
        ...(x > 0 ? ['a'] : []),
        'b',
    ];
    [...[], 1]
}

//代替apply方法  因为扩展运算符可以展开数组，所以不需要apply方法把数组转成函数参数来
{
    function f (x, y, z) {

    }
    var args = [0, 1, 2]
    // es5
    f.apply(null, args)
    // es6
    f(...args)

    // ES5 的写法
    Math.max.apply(null, [14, 3, 77])

    // ES6 的写法
    Math.max(...[14, 3, 77])

    // 等同于
    Math.max(14, 3, 77);

    // ES5的 写法
    var arr1 = [0, 1, 2];
    var arr2 = [3, 4, 5];
    Array.prototype.push.apply(arr1, arr2);

    // ES6 的写法
    var arr1 = [0, 1, 2];
    var arr2 = [3, 4, 5];
    arr1.push(...arr2);

    // var a1 = [0, 1, 2];
    // var a2 = [3, 4, 5];
    // a1.push.apply(a1, a2)
    // console.log(a1)

    // ES5
    new (Date.bind.apply(Date, [null, 2015, 1, 1]))
    // ES6
    new Date(...[2015, 1, 1]);
}

//扩展运算符的应用 § ⇧
// 复制数组
//数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
{
    const a1 = [1, 2];
    const a2 = a1;

    a2[0] = 2;
    a1 // [2, 2]
}
//ES5 只能用变通方法来复制数组。
{
    const a1 = [1, 2];
    const a2 = a1.concat(1, 3, 2);
    // const a2 = a1.concat([1, 3, 2]);

    a2[0] = 2;
    // console.log(a1)
    // console.log(a2)
}
//扩展运算符提供了复制数组的简便写法。
{
    const a1 = [1, 2];
    // 写法一
    // const a2 = [...a1];
    // 写法二
    // const [...a2] = a1;
}

//合并数组

{
    const arr1 = ['a', 'b'];
    const arr2 = ['c'];
    const arr3 = ['d', 'e'];

    // ES5 的合并数组
    arr1.concat(arr2, arr3);
    // [ 'a', 'b', 'c', 'd', 'e' ]

    // ES6 的合并数组
    [...arr1, ...arr2, ...arr3]
}
// 不过，这两种方法都是浅拷贝，使用的时候需要注意。

{
    const a1 = [{ foo: 1 }];
    const a2 = [{ bar: 2 }];

    const a3 = a1.concat(a2);
    const a4 = [...a1, ...a2];

    a3[0] === a1[0] // true
    a4[0] === a1[0] // true
}
// 上面代码中，a3和a4是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，这就是浅拷贝。如果修改了引用指向的值，会同步反映到新数组。

//与解构赋值结合
{
    var list = []
    // ES5
    a = list[0], rest = list.slice(1);
    // ES6
    [a, ...rest] = list

}
{
    const [first, ...rest] = [1, 2, 3, 4, 5];
    // first // 1
    // rest  // [2, 3, 4, 5]
}

{
    const [first, ...rest] = [];
    // first // undefined
    // rest  // []
}
{
    const [first, ...rest] = ["foo"];
    // first  // "foo"
    // rest   // []
}

//字符串

{
    [...'hello']
    // [ "h", "e", "l", "l", "o" ]
}
//上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。
{
    'x\uD83D\uDE80y'.length;// 4
    [...'x\uD83D\uDE80y'].length; // 3
    let str = 'x\uD83D\uDE80y';

    str.split('').reverse().join('');
    // 'y\uDE80\uD83Dx'

    [...str].reverse().join('')
    // 'y\uD83D\uDE80x'
}

// 实现了 Iterator 接口的对象
//任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。
{
    let nodeList = document.querySelectorAll('div');
    let array = [...nodeList];
}
//上面代码中，querySelectorAll方法返回的是一个NodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 。
{
    Number.prototype[Symbol.iterator] = function* () {
        let i = 0;
        let num = this.valueOf();
        while (i < num) {
            yield i++;
        }
    }
    // console.log([...5]) // [0, 1, 2, 3, 4]
    // function* countAppleSales () {
    //     for (var i = 0; true; i++) {
    //         var reset = yield i;
    //         console.log(reset)
    //         if (reset) { i = -1; }
    //     }
    // }
    // var myArr = countAppleSales();
    // console.log(myArr.next());
    // console.log(myArr.next());
    // console.log(myArr.next());
    // console.log(myArr.next(1));

    // console.log(myArr)
}


//Map 和 Set 结构，Generator 函数
{
    //扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
    ])

    // console.log([...map.keys()])
    //Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
    const go = function* () {
        yield 1;
        yield 2;
        yield 3;
    };
    //上面代码中，变量go是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。
    // console.log([...go()])// [1, 2, 3]
    //如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。
}

// Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
{
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };

    // ES5的写法
    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

    // ES6的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
}
//实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
{
    // NodeList对象
    let ps = document.querySelectorAll('div');
    let ps1 = Array.from(ps).filter(p => {
        return p.textContent.length > 100;
    });
    // console.log(ps)
    // console.log(ps1)
    // arguments对象
    function foo () {
        var args = Array.from(arguments);
        // ...
    }
}
//扩展运算符背后调用的是遍历器接口（Symbol.iterator），如果一个对象没有部署这个接口，就无法转换。Array.from方法还支持类似数组的对象。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
{
    // console.log(Array.from({ 1: 'a', length: 3 }));
    // [ undefined, a, undefined ]
}
// 对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
{
    const toArray = (() =>
        Array.from ? Array.from : obj => [].slice.call(obj)
    )();
}
//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
{
    var arrayLike = [];
    Array.from(arrayLike, x => x * x);
    // 等同于
    Array.from(arrayLike).map(x => x * x);

    Array.from([1, 2, 3], (x) => x * x)
    // [1, 4, 9]

}
{
    let divs = document.querySelectorAll('div');
    let textArray = Array.from(divs, div => div.textContent)
    // console.log(textArray)
}
//返回各种数据的类型。
{
    function typesOf () {
        return Array.from(arguments, value => typeof value)
    }
    // console.log(typesOf(null, [], NaN, 1, 'aaas'))
    // ['object', 'object', 'number']
}
//如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。
//Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法。
{
    let newArr = Array.from({ length: 3 }, (value, index) => 'index：' + index + ' value：' + value);
    // console.log(newArr)
}
//Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
{
    function countSymbols (string) {
        return Array.from(string).length;
    }
}

//Array.of方法用于将一组值，转换为数组。
{
    // console.log(Array.of('1', 1, 2))
}
//这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
{
    // console.log(Array()) // []
    // console.log(Array(3)) // [, , ,]
    // console.log(Array(3, 11, 8)) // [3, 11, 8]
    Array.of() // []
    Array.of(undefined) // [undefined]
    Array.of(1) // [1]
    Array.of(1, 2) // [1, 2]
}
//Array.of方法可以用下面的代码模拟实现。
{
    function ArrayOf () {
        return [].slice.call(arguments);
    }
}

//数组实例的 copyWithin() 
//数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
{
    // Array.prototype.copyWithin(target, start = 0, end = this.length)
    // target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
    // start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
    // end（可选）：到该位置"前"停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
    // console.log([1, 2, 3, 4, 5].copyWithin(0, 3));
    // console.log(['a', 'b', 'c', 'd', 'e'].copyWithin(0, 2, 3));
    // 将3号位复制到0号位
    [1, 2, 3, 4, 5].copyWithin(0, 3, 4);
    // [4, 2, 3, 4, 5]

    // -2相当于3号位，-1相当于4号位
    [1, 2, 3, 4, 5].copyWithin(0, -2, -1);
    // [4, 2, 3, 4, 5]

    // 将3号位复制到0号位
    [].copyWithin.call({ length: 5, 3: 1 }, 0, 3);
    // {0: 1, 3: 1, length: 5}

    // 将2号位到数组结束，复制到0号位
    let i32a = new Int32Array([1, 2, 3, 4, 5]);
    i32a.copyWithin(0, 2);
    // Int32Array [3, 4, 5, 4, 5]

    // 对于没有部署 TypedArray 的 copyWithin 方法的平台
    // 需要采用下面的写法
    [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
    // Int32Array [4, 2, 3, 4, 5]
}

//数组实例的 find() 和 findIndex()
//数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数
//直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
{
    var r = [1, -3, -4].find(n => n < 0);
    var r = [1, -3, -4].find((value, index, arr) => value < 0);
    // console.log(r)
}
//数组实例的findIndex方法的用法与find方法非常类似，如果所有成员都不符合条件，则返回-1。返回第一个符合条件的数组成员的位置，
{
    [1, 5, 10, 15].findIndex(function (value, index, arr) {
        return value > 9;
    }); // 2
    [NaN].indexOf(NaN);
    // -1

    [NaN].findIndex(y => Object.is(NaN, y));
    // 0
}
// 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
{
    function f (v) {
        return v > this.age;
    }
    let person = { name: 'John', age: 20 };
    [10, 12, 26, 15].find(f, person);    // 26
}

//数组实例的 fill()
{
    ['a', 'b', 'c'].fill(7)
    // [7, 7, 7]

    new Array(3).fill(7)
    // [7, 7, 7]
}
// 上面代码表明，fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
// 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。
{
    ['a', 'b', 'c'].fill(7, 1, 2)
    // ['a', 7, 'c']   
}
// 数组实例的 entries()，keys() 和 values() §
{
    for (let index of ['a', 'b'].keys()) {
        // console.log(index);
    }
    // 0
    // 1

    for (let elem of ['a', 'b'].values()) {
        // console.log(elem);
    }
    // 'a'
    // 'b'

    for (let [index, elem] of ['a', 'b'].entries()) {
        // console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"
}

// /如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
{
    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    // console.log(entries.next().value); // [0, 'a']
    // console.log(entries.next().value); // [1, 'b']
    // console.log(entries.next().value); // [2, 'c']  
}
//数组实例的 includes()
//Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。
{
    [1, 2, 3].includes(2);    // true
    [1, 2, 3].includes(4);    // false
    [1, 2, NaN].includes(NaN); // true
}
//该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
{
    [1, 2, 3].includes(3, 3);  // false
    [1, 2, 3].includes(3, -1); // true
}
//没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。
{
    var arr = '', el = '';
    if (arr.indexOf(el) !== -1) {
        // ...
    }
}
// 下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。
{
    const contains = (() =>
        Array.prototype.includes
            ? (arr, value) => arr.includes(value)
            : (arr, value) => arr.some(el => el === value)
    )();
    contains(['foo', 'bar'], 'baz'); // => false
}

//数组实例的 flat()，flatMap()
// 数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
// flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1
{
    [1, 2, [3, 4]].flat();
    // [1, 2, 3, 4]
    [1, 2, [3, [4, 5]]].flat();
    // [1, 2, 3, [4, 5]]
    [1, 2, [3, [4, 5]]].flat(2);
    // [1, 2, 3, 4, 5]
}
// 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
{
    [1, [2, [3]]].flat(Infinity);
    // [1, 2, 3]
}
//如果原数组有空位，flat()方法会跳过空位。
{
    [1, 2, , 4, 5].flat();
    // [1, 2, 4, 5]
}
//数组的空位
//数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位
{
    Array(3) // [, , ,]  
}
// 上面代码中，Array(3)返回一个具有 3 个空位的数组。
// 注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
{
    0 in [undefined, undefined, undefined] // true
    0 in [, , ,] // false
}
// 上面代码说明，第一个数组的 0 号位置是有值的，第二个数组的 0 号位置没有值。
// ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
// forEach(), filter(), reduce(), every() 和some()都会跳过空位。
// map()会跳过空位，但会保留这个值
// join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
{
    // forEach方法
    [, 'a'].forEach((x, i) => console.log(i)); // 1

    // filter方法
    ['a', , 'b'].filter(x => true); // ['a','b']

    // every方法
    [, 'a'].every(x => x === 'a');  // true

    // reduce方法
    [1, , 2].reduce((x, y) => x + y);  // 3

    // some方法
    [, 'a'].some(x => x !== 'a'); // false

    // map方法
    [, 'a'].map(x => 1);  // [,1]

    // join方法
    [, 'a', undefined, null].join('#');  // "#a##"

    // toString方法
    [, 'a', undefined, null].toString(); // ",a,,"
}

// ES6 则是明确将空位转为undefined。
// Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。