const PENDING = Symbol('PENDING');
const FULFILLED = Symbol('FULFILLED');
const REJECTED = Symbol('REJECTED');

class MyPromise {
    constructor(fn) {
        if (typeof fn !== 'function') throw new Error('必须传入回调函数。')

        this.fulfilledQueue = [];// 成功回调队列
        this.rejectedQueue = [];// 失败回调队列
        this._status = PENDING;
        this._value = null;

        // 执行成功队列
        const handleFulfilledQueue = () => {
            while (this.fulfilledQueue.length) {
                let fulfilledFn = this.fulfilledQueue.shift();//从原队列中删除第一个，并且返回第一个。
                fulfilledFn(this._value)
            }
        }

        // 执行失败队列
        const handleRejectedQueue = () => {
            while (this.rejectedQueue.length) {
                let rejectedFn = this.rejectedQueue.shift();//从原队列中删除第一个，并且返回第一个。
                rejectedFn(this._value)
            }
        }

        // 完成状态转变，执行成功队列中的回调函数
        const _resolve = (val) => {
            const fn = () => {
                if (this._status != PENDING) {
                    // 不是 初始状态 直接结束
                    return
                }
                if (val instanceof MyPromise) {
                    // 判断传入的是不是MyPromise的实例
                    // 是 则执行.then 传入的promise对象的状态当作整个promise的状态
                    val.then((res) => {
                        this._status = FULFILLED;
                        this._value = res;
                        handleFulfilledQueue();
                    }, (err) => {
                        this._status = REJECTED;
                        this._value = err;
                        handleRejectedQueue();
                    });
                } else {
                    // 不是  直接改变状态
                    this._status = FULFILLED;
                    this._value = val;
                    handleFulfilledQueue();
                }
            }
            // 保证promise 回调函数一定是在同步任务之后执行； 原生的是微任务，默认就是在同步事件后面执行 这里是模拟。
            setTimeout(fn, 0);
        }

        // 完成pending到rejected的转变，执行rejected队列中的回调函数。

        const _reject = (val) => {
            const fn = () => {
                if (this._status !== PENDING) {
                    return;
                }
                this._status = REJECTED;
                this._value = val;
                handleRejectedQueue();
            }
            setTimeout(fn, 0);
        }

        try {  // 处理外部传入函数执行异常
            fn(_resolve, _reject);
        } catch (e) {
            return _reject(e);
        }

    }
    then (successFn, failFn) {
        return new MyPromise((resolve, reject) => {
            const handleSuccess = fn => {
                try {
                    if (typeof fn === 'function') {
                        const res = fn(this._value);
                        if (res instanceof MyPromise) {
                            res.then(resolve, reject)
                        } else {
                            resolve(res);
                        }
                    } else {
                        resolve(this._value)
                    }
                } catch (e) {
                    reject(e)
                }
            }

            const handleFail = fn => {
                try {
                    if (typeof fn === 'function') {
                        const res = fn(this._value);
                        if (res instanceof MyPromise) {
                            res.then(resolve, reject);
                        } else {
                            resolve(res);
                        }
                    } else {
                        reject(this._value);
                    }
                } catch (e) {
                    reject(e);
                }
            }

            switch (this._status) {
                case PENDING:
                    //异步任务未完成，将回调放入对应队列。
                    this.fulfilledQueue.push(() => {
                        handleSuccess(successFn);
                    });
                    this.rejectedQueue.push(() => {
                        handleFail(failFn);
                    });
                    break;
                case FULFILLED:
                    handleSuccess(successFn);
                    break;
                case REJECTED:
                    handleFail(failFn);
                    break;
                default:
                    console.log('Promise error status:', this._status);
                    break;
            }
        })
    }
    catch (failFn) {
        return this.then(null, failFn);
    }
    finally (finallyFn) {
        return this.then(finalFn, finalFn);
    }
    static resovle (val) {
        if (val instanceof MyPromise) {
            return val;
        } else {
            return new MyPromise((resolve, reject) => {
                resolve(val);
            });
        }
    }
    static reject (val) {
        return new MyPromise((resolve, reject) => {
            reject(val);
        });
    }
    static all (promiseArr) {
        return new Promise((resolve, reject) => {
            const len = promiseArr.length;
            let count = 0;
            let result = [];
            for (let i = 0; i < len; i++) {
                promiseArr[i].then((val) => {
                    count++;
                    result.push[val];
                    if (count === len) {
                        resolve(result);
                    }
                }, (err) => {
                    reject(err);
                });
            }
        })
    }
    static race (promiseArr) {
        return new Promise((resolve, reject) => {
            const len = promiseArr.length;
            for (let i = 0; i < len; i++) {
                promiseArr[i].then((val) => {
                    resolve(val);
                }, (err) => {
                    reject(err);
                });
            }
        })
    }
}

var p1 = new MyPromise((resovle, reject) => {
    resovle('s')
});
var p2 = new Promise((resovle, reject) => {
    resovle('s')
});
p1.then((res) => {
    console.log(res)
}).then((res) => {
    console.log(res)
})
p1.then(console.log, console.log)
// console.log(p1)
// console.log(p2)
