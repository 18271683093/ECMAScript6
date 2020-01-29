var A = {};
A.isFinite = (function (_globel) {
    var _globel_isFinite = _globel.isFinite;
    return Number.isFinite || function (num) {
        return typeof num === 'number' && _globel_isFinite(num)
    }
})(this)

A.isNaN = (function (_globel) {
    var _globel_isNaN = _globel.isNaN;
    return Number.isNaN || function (num) {
        return typeof num === 'number' && _globel_isNaN(num)
    }
})(this)

A.parseInt = (function (_globel) {
    var _globel_parseInt = _globel.parseInt;
    return Number.parseInt || function (num) {
        return typeof num === 'number' && _globel_parseInt(num)
    }
})(this)

A.patseFloat = (function (_globel) {
    var _globel_patseFloat = _globel.patseFloat;
    return Number.patseFloat || function (num) {
        return typeof num === 'number' && _globel_patseFloat(num)
    }
})(this)

//判断是否为整数 注意 因为js整数和浮点数是同样的储存方法 所以3 和 3.0 被视为同一个数
A.isInteger = (function (_globel) {
    var _globel_isFinite = _globel.isFinite, floor = Math.floor;
    return Number.isInteger || function (num) {
        return typeof num === 'number' && _globel_isFinite(num) && floor(num) === num;
    }
})(this)

// 新增极小常量
A.EPSILON = Number.EPSILON || 2.220336049250313e-16;

// 安全整数 js能准确表示的整数在-2的53次方和2的53次方之间，不含端点，超过这个范围就无法精确表示。
// Math.pow(2,53); 
// Math.pow(2, 53) === Math.pow(2, 53) + 1  //true  无法精确表示
// es6 引入两个常量表示这个范围的上下限
A.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
A.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -Math.pow(2, 53) + 1;

A.isSafeInterger = Number.isSafeInterger || function (num) {
    return (typeof num === 'number' && Math.round(n) === n && A.MIN_SAFE_INTEGER <= n && n <= Number.MAX_SAFE_INTEGER)
}

