var fs = require('fs');
var data = '';

//从流中读取数据
//创建可读流
var reader = fs.createReadStream('../readme.txt');
//设置编码
reader.setEncoding('UTF8');
//处理流事件：data, end
reader.on('data', function(chunk) {
    //chunk为读取文件的数据
    data += chunk;
    //reader.pause()暂停
    //reader.resume()继续
});
reader.on('end', function() {
    console.log('read end: '+ data);
});
reader.on('error', function(err) {
    console.log('error: ' + err.stack);
});

console.log('program finished.');

//写入流
var text = 'write something.';
//创建写入流，参数为写入文件的路径
var writer = fs.createWriteStream('../output.txt');
//使用UTF8编码写入数据
writer.write(text, 'UTF8');
//标记文件末尾
writer.end();
//处理流事件：finish, error
writer.on('finish', function() {
    console.log('write finish.');
});
writer.on('error', function(err) {
    console.log('error: ' + err.stack);
});
writer.on('drain', function() {
    console.log('已经将缓存区文件写入目标，可以传入下一个待写数据');
});

console.log('program finished.');

//管道流
//创建可读流
var readStream = fs.createReadStream('../readme.txt');
//创建可写流
var writeStream = fs.createWriteStream('../output.txt');
//管道读写操作：读取readme.txt的内容写入output.txt
readStream.pipe(writeStream);

//链式流
//链式流一般用于管道操作，可以压缩与解压gzip文件
//引入压缩的模块
var zlib = require('zlib');
//压缩readme.txt文件为readme.txt.gz
fs.createReadStream('../readme.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('../readme.txt.gz'));