var fs = require('fs');

console.log('sync' + fs.readFileSync('../readme.txt').toString());

//异步（非阻塞）执行

fs.readFile('../readme.txt', function(err, data) {
  if (err)
    return console.error(err);
  console.log('async' + data.toString());
});

console.log('另一个指令');
