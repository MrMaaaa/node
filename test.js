var m = require('./modules/MUtils.js');
var fs = require('fs');
var path = require('path');

// 调用遍历模块
m.traverse('D:\\图片', function(pathname) {
    console.log(pathname);
}, function() {
    console.log('finished');
});

// console.log(m.func_list());
