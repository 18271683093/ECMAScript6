// eventLoop
/* 基础事件循环机制 */
// {
//     setTimeout(() => {
//         console.log(1)
//     }, 10);
//     new Promise((resolve, reject) => {
//         console.log(2)
//         resolve(3)
//     }).then((res) => console.log(res))
//     console.log(4)
//     new Promise((resolve, reject) => {
//         console.log(5)
//         resolve(6)
//     }).then((res) => console.log(res))
//     setTimeout(() => {
//         console.log(7)
//     }, 0);
// }
//事件循环 宏任务 = 》 微任务

// 指向script块的宏任务
// 执行到 setTimeout 异步宏任务，挂起事件，因为时间为10， 0.01s后返回结果，将回调函数放入宏任务事件队列
// 执行第一个Promise,立即执行new Promise,接受一个回调函数，执行行回调函数，回调函数内部都是同步，顺序执行，执行console.log(2) 同步任务 直接执行 控制台打印2 resolve(3) 同步任务  执行 resolve(3) ；
// 执行，then() 异步微任务，回调加入到微任务队列
// 离开new Promise 执行上下文 回到全局上下文 
// 继续执行console.log(4) 同步任务 直接执行 打印4
// 执行new Promise  同理 执行 console.log(5)   resolve(6) ； 将。then回调加入微任务队列
// 执行setTimeout 异宏任务 时间0  0后将回调加入到宏任务队列
// 第一次宏任务执行完毕，当前执行栈为空，查看微任务队列，查询到有两调.then的回调函数。按照队列的先进先出的原则，顺序加到执行栈，开始执行。
// 执行第一个。then回调  打印3 在执行第二个打印6。
// 微任务执行完毕 ，第一次循环结束

// 第二次执行开始
// 首先查看宏任务队列是否有任务。
// 有两条setTimeOut 的回调函数，队列的先进先出。
// 开始执行第一条，加入到执行栈
// 执行回调函数，函数内部执行到 console.log(7) 打印7。注意 异步函数加入队列的事件 是按照返回结果的时候才加入到队列的，所以上面两个setTimeOut,延迟0s的先加入到队列。
// 继续执行，这一条宏任务执行完毕。
// 查看微任务队列，发现没有微任务。结束第二次玄幻

//第三次开始。 
// ...

// 直到宏任务队列为空。
// 微任务为空。

/* 继续在异步宏任务中嵌套微任务，验证每次宏任务执行完后 会执行所有微任务队列 */

// {
//     var timeout = 2;
//     setTimeout(() => {
//         console.log(1);
//         new Promise((resolve, reject) => {
//             console.log(2)
//             resolve(3)
//         }).then((res) => console.log(res))

//     }, timeout);
//     new Promise((resolve, reject) => {
//         console.log(5)
//         resolve(6)
//         setTimeout(() => {
//             console.log(7)
//         }, 0);
//     }).then((res) => console.log(res))
// }

// 开始 按照之前的逻辑
// 第一轮循环
// 将第一个setTimeOut,timeout s后加入到宏任务队列
// 执行new Promise, 打印5 resolve(6)，0后将第二setTimeOut放入宏任务队列
// 宏任务执行完毕，开始性质微任务队列
// 打印6. 微任务队列只有一个函数，结束。 
// 开始读取第二个宏任务。
// 这个测试了一下 timeout 设置为0合1的时候，会在微任务中那个setTimeOut之前执行。
// 但是timeOut设置过大就会在后面
// 所以一次循环中，需要加入到宏任务队列的回调的先后，取决于异步返回结果的时间的差 是否大于 两个句代码之间需要的执行时间。
// 所以宏任务中的异步函数和此次宏任务执行后接着执行的所有微任务中新增的宏任务异步 加入队列的时间是在一次循环中。
// 所以上面会产生两种结果。5 6  1 2 3 7 or 5 6 7 1 2 3 
// 验证了 一次宏任务结束，会执行所有的微任务。
// 然后再执行下一个宏任务,再执行所有微任务。


