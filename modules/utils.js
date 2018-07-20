/**
 * 同步遍历指定路径目录
 * @param {String} dir 目录地址
 * @param {Function} callback 回调
 */
function traverseSync(dir, callback) {
  const fs = require('fs');
  const path = require('path');
  fs.readdirSync(dir).forEach((file) => {
    const pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      traverse(pathname, callback);
    } else {
      callback && callback(pathname);
    }
  });
}

/**
 * 异步遍历指定路径目录
 * @param {Stirng} dir 目录地址
 * @param {Function} callback 回调
 * @param {Function} finish 遍历结束回调
 * @param {Boolean} isDeepTraverse 是否遍历子文件夹
 */
function traverse(dir, callback, finish, isDeepTraverse = true) {
  const fs = require('fs');
  const path = require('path');

  fs.readdir(dir, (err, files) => {
    if (err) {
      throw err;
    }
    (function next(i) {
      if (i < files.length) {
        const pathname = path.join(dir, files[i]);

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
    })(0);
  });
}

/**
 * 发送邮件（需收件方开启smtp）
 * @param {Object} options receiver-收件人 title-标题 text-文本格式内容 html-html格式内容
 */
function sendEmail(options) {
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
  const mailOptions = {
    from: '马腾飞 <tenfyma@foxmail.com>',
    to: options.receiver, //收件人，多个收件人用逗号隔开
    subject: options.title, //标题
    text: options.text, //文本格式内容
    html: options.html //html格式内容
    /*attachments: [{ //上传附件
      filename: 'json',
      path: './add.html'
    }]*/
  };

  smtpTransport.sendMail(mailOptions, function(error, response) {
    let status = '';
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

/**
 * 获取变量类型
 * @param {*} variable 变量
 * @return {String} 变量类型
 */
function typeOf(variable) {
  return Object.prototype.toString
    .call(variable)
    .match(/(?<=\[object\s).+(?=\])/gi)[0]
    .toLowerCase();
}

/**
 * 将字符串进行正则转义，使之可以构造正则对象
 * @param {String} string 待转义字符串
 * @return {String} 转义后字符串
 */
function escapeRegExp(string) {
  // $&表示整个被匹配的字符串
  return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$&');
}

exports = module.exports = {
  traverse,
  traverseSync,
  sendEmail,
  typeOf,
  escapeRegExp
};
