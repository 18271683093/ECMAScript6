var M = {};

// 统一处理
M.extend = function (obj) {
    // 将M上的方法都挂载到Math上
    var _this = this;
    Object.getOwnPropertyNames(_this).forEach(function (key) {
        if (_this.hasOwnProperty(key)) {
            obj[key] = _this[key]
            // obj[key] ||
        }
    })

    // this[name] = Math[name] || func
}
// Math.trunc()  用于去除小数部分
M.trunc1 = function (num) {
    return num < 0 ? Math.ceil(num) : Math.floor(num)
}

// 判断一个数是整数 +1  辅助-1 或者0  其他值 NaN
M.sign = function (num) {
    num = +num;
    if (num === 0 || isNaN(num)) {
        return num
    }
    return num > 0 ? 1 : -1
}
//计算一个数的立方根
M.cbrt = function (num) {
    var y = Math.pow(Math.abs(x), 1 / 3);
    return y < 0 ? -y : y;
}

//Math.fround方法返回一个数的32位单精度浮点数形式。
M.fround = function (num) {
    return new Float32Array([num])[0]
}
//Math.hypot方法返回所有参数的平方和的平方根。
M.hypot = function () {
    console.log(arguments)
    var flag = [].every.call(arguments, function (num, index) {
        num = +num;
        if (num === NaN) {
            return false
        }
        else {
            arguments[index] = num;
            return true
        }
    }), result = 0;
    if (!flag) {
        return NaN
    }
    [].forEach.call(arguments, function (num) {
        result += Math.pow(num, 2)
    })
    return Math.pow(result, 1 / 2)
}

//Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
M.expm1 = function (num) {
    return Math.exp(x) - 1;
}
// Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN
M.log1p = function (x) {
    return Math.log(1 + x);
};
// Math.log2(x)返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。
M.log2 = function (x) {
    return Math.log(x) / Math.LN2;
};
//Math.log10(x)返回以 10 为底的x的对数。如果x小于 0，则返回 NaN。
Math.log10 = Math.log10 || function (x) {
    return Math.log(x) / Math.LN10;
};
// Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
// Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
// Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
// Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
// Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
// Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
M.extend(Math)