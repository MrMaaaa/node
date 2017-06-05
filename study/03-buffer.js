var buf = new Buffer(9);
//允许链式写法

//写入缓冲区，输出写入字节数
console.log('length: ' + buf.write('matengfei'));

var buff = new Buffer(26);
for(let i = 0; i < 26; i++) {
    buff[i] = i + 97;
}

//toString第二、三个参数指定输出的起始位置与结束位置
console.log(buff.toString('ascii', 0, 5));
console.log(buff.toString('utf8'));

//转为JSON对象：console.log(buff.toJSON());

//合并
console.log(Buffer.concat([buf, buff]).toString());

//比较
var buf1 = new Buffer('d');
var buf2 = new Buffer('c');

//比较是否相同为buf1.equals(buf2)，相同返回true，否则返回false
var compareResult = buf1.compare(buf2);

if(compareResult < 0) {
    console.log(buf1.toString() + '在' + buf2.toString() + '之前。');
} else if(compareResult == 0) {
    console.log(buf1.toString() + '与' + buf2.toString() + '相同。');
} else {
    console.log(buf1.toString() + '在' + buf2.toString() + '之后。');
}


//拷贝
var buf3 = new Buffer(9);
buf.copy(buf3); //后续参数为targetStart, sourceStart, sourceLength
//或者使用这种简写：var buf3 = new Buffer(buf);
console.log(buf3.toString());

//剪切： buffer.slice(start, end)

//缓冲区长度：buffer.length

//填充，参数为value, offset, length，如果只有一个参数则会填充整个长度
console.log(buf3.fill('abc').toString());