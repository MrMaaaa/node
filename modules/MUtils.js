//同步遍历指定路径目录
function traverseSync(dir, callback) {
  var fs = fs || require('fs');
  var path = path || require('path');
  fs.readdirSync(dir).forEach((file) => {
    var pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      traverse(pathname, callback);
    } else {
      callback && callback(pathname);
    }
  });
};

//异步遍历指定路径目录
function traverse(dir, callback, finish, isDeepTraverse=true) {
  var fs = fs || require('fs');
  var path = path || require('path');

  fs.readdir(dir, (err, files) => {
    (function next(i) {
      if (i < files.length) {
        var pathname = path.join(dir, files[i]);

        fs.stat(pathname, function(err, stats) {
          if (stats.isDirectory() && isDeepTraverse) {
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
    }(0));
  });
}

function sendEmail(options) {
  var request = request || require('request');
  var mail = mail || require('nodemailer');

  var smtpTransport = mail.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true,
    port: 587, //腾讯端口为465或587
    auth: {
      user: 'tenfyma@foxmail.com',
      pass: 'otiiohqmkqnfbeii'
    }
  });

  //设置邮箱内容
  var mailOptions = {
    from: '马腾飞 <tenfyma@foxmail.com>',
    to: options.receiver, //收件人，多个收件人用逗号隔开
    subject: options.title, //标题
    text: options.text, //文本格式内容
    html: options.html, //html格式内容
    /*attachments: [{ //上传附件
      filename: 'json',
      path: './add.html'
    }]*/
  };

  smtpTransport.sendMail(mailOptions, function(error, response) {
    var status = '';
    if (error) {
      console.log(error);
      status = error;
    } else {
      console.log('success' + response.response);
      status = '200';
    }
    smtpTransport.close();
    return status;
  });

}

//显示方法的参数
function func_list() {
  return {
    traverse: ['dir', 'callback(pathname)', 'finish()'],
    traverseSync: ['dir', 'callback(pathname)'],
    sendEmail: ['options[object] keys: receiver, title, text, html'],
    moduleList: ['no args']
  }
}

exports.traverse = traverse;
exports.traverseSync = traverseSync;
exports.sendEmail = sendEmail;
exports.func_list = func_list;
