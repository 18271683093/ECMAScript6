// 关键字yield
// 没错，yield是个关键字，不是函数。关键字用来干啥？它的作用是“命令”。和var不同，不是用来声明，但是和return一样，用来告知程序某种状态，return告诉程序要返回什么值（也意味着结束，结束的时候才会返回值嘛），而yield告诉程序当前的状态值，而且你运行到这里给我暂停一下。
//yield也必须在Generator函数中才有意义

//next 执行
{

    console.log = function () { } //禁止打印
    {
        var a = 0;

        function* foo (num = 1) {
            a += num;
            var yield1 = yield '第一个yield,value:' + a; //第一次暂停
            console.log("yield1:" + yield1)
            a += num;
            var yield2 = yield '第二个yield,value:' + a; //第二次暂停
            console.log("yield2:" + yield2)
            a += num;
            var yield3 = yield '第三个yield,value:' + a; //第三次暂停
            console.log("yield3:" + yield3)
            a += num;
            return 'return'; //结束
        }

        var f = foo()

        console.log(f)
        console.log(a)

        console.log(f.next('第一次传参')) //开始执行 碰到第一个yield 返回 一个状态 value: yield表达式的值 done:是否执行完成
        console.log(f)
        console.log(a)

        console.log(f.next('第二次传参'))
        console.log(f)
        console.log(a)

        console.log(f.next('第三次传参'))
        console.log(f)
        console.log(a)

        console.log(f.next('return'))
        console.log(f)
        console.log(a)

    }
    // .next()方法
    // 就用上面的代码来说好了。Generator函数的特点就是“它是一个遍历器”，你不让它动，它绝对不会动。

    // “执行、运行”，当调用f.next()的时候，程序从f这个遍历器函数的开始运行，当遇到yield命令时，表示“暂停”，并且返回yield [expression]的状态。比如程序在往下运行的时候，遇到yield 1 + 2，那么next()返回的结果就是这个时候的状态。

    // 而f.next()就是让它往下一个元素遍历的动作，它的返回值其实表示一个状态，是一个object：{value: xxx, done: false}。value表示yield后面的表达式的结果值，done表示是否已经遍历完。把上面的f.next()那段代码改成下面的：

    // 只有执行next()的时候 才会真正开始执行
    // 碰到yield就停止 并且返回yield“后面”表达式的值 （next（）调用的返回值）   console.log(f.next(2))
    // 并且 yield加表达式的也是有返回值的
    // 当调用next(param)传入了参数，那么这个参数，会作为上一次yield表达式“整体”的返回值  console.log("yield1:" + yield1)

    // for..of 遍历的实现
    {
        function* foo () {
            yield 1;
            yield 2;
            yield 3;
            return;
        }


        for (let v of foo()) {
            // console.log(v);
        }

    }
    // 实现一个iterator接口 满足es6解构
    {
        function Foo () {
            this.arr = [1, 2, 3]
        }
        Foo.prototype[Symbol.iterator] = function* () {
            let idx = 0, arr = this.arr;
            while (idx < arr.length) {
                yield arr[idx++]
            }
            return;
        }

        var arr = new Foo();
        console.log(...arr)
        for (var val of arr) {
            console.log(val);
        }

    }
}