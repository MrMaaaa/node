//同步遍历指定路径目录
exports.traverseSync = (dir, callback) => {
  const fs = require('fs');
  const path = require('path');
  fs.readdirSync(dir).forEach((file) => {
    let pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      traverse(pathname, callback);
    } else {
      callback && callback(pathname);
    }
  });
}

//异步遍历指定路径目录
exports.traverse = (dir, callback, finish) => {
  const fs = require('fs');
  const path = require('path');

  fs.readdir(dir, (err, files) => {
    (function next(i) {
      if (i < files.length) {
        let pathname = path.join(dir, files[i]);

        fs.stat(pathname, (err, stats) => {
          if (stats.isDirectory()) {
            traverse(pathname, callback, function() {
              next(i + 1);
            });
          } else {
            callback && callback(pathname);
            next(i + 1);
          }
        });
      } else {
        finish && finish();
      }
    })(0);
  });
}

exports.sendEmail = (options) => {
  const request = require('request');
  const mail = require('nodemailer');

  const smtpTransport = mail.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true,
    port: 587, //腾讯端口为465或587
    auth: {
      user: 'tenfyma@foxmail.com',
      pass: 'otiiohqmkqnfbeii'
    }
  });

  //设置邮箱内容
  smtpTransport.sendMail(options, (error, response) => {
    if (error) {
      console.log(`error (${error})`);
    } else {
      console.log(`success (${response.response})`);
    }
    smtpTransport.close();
  });
}
