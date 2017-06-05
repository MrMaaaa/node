var path = require('path');

//获取路径的文件名，不包含其他文件夹名，可以去掉指定第二个参数的后缀
console.log(path.basename('../data/mydata.txt', '.txt')); //mydata

//获取路径的文件夹名，不包含目标文件
console.log(path.dirname('../data/mydata.txt')); //../data

//解析为标准路径，去除多余斜杠
console.log(path.normalize('./data//mydata.txt')); //data\mydata.txt

//路径拼接
console.log(path.join('./data', '/mydata.txt')); //data\mydata.txt

//获取扩展名
console.log(path.extname('mydata.txt')); //.txt

//格式化路径
console.log(path.format({
    root: 'C:\\',
    dir: 'C:\\path\\dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'name'
}));//C:\path\dir\file.txt

//标准路径转对象
console.log(path.parse('C:\\path\\dir\\file.txt'));
/*
{
    root: 'C:\\',
    dir: 'C:\\path\\dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
}
*/

//判断是否为绝对路径
console.log(path.isAbsolute('../'));

