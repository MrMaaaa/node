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
    from: options.from || '马腾飞 <tenfyma@foxmail.com>',
    to: options.to, //收件人，多个收件人用逗号隔开
    subject: options.title, //标题
    text: options.text, //文本格式内容
    html: options.html //html格式内容
    /*attachments: [{ //上传附件
      filename: 'json',
      path: './add.html'
    }]*/
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
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
    .slice(8, -1)
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

/**
 * 加法（纯函数）
 * @param  {number} args 数字
 * @return {Object} 如果含参数，返回该方法，否则返回计算结果
 */
function add(...args) {
  const fn = function(...arg_fn) {
    if (arg_fn.length === 0) {
      return args.reduce((a, b) => a + b);
    }
    return add.apply(null, args.concat(arg_fn));
  };
  fn.valueOf = function() {
    return args.reduce((a, b) => a + b);
  };
  fn.toString = function() {
    return args.reduce((a, b) => a + b);
  };
  return fn;
}

/**
 * 产生随机整数
 * @param {String|Number} min 最小值
 * @param {String|Number} max 最大值
 * @return {Number} 随机数
 */
function randomBetween(min, max, type = 2) {
  if (!/^\d{1,}$/.test(min) || !/^\d{1,}$/.test(max)) {
    throw new Error('无效的数字');
  }
  //如果数值输反了自行纠正
  if (min === max) {
    return min;
  } else if (min > max) {
    [min, max] = [max, min];
  }

  const diff = max - min;

  if (type === 0) {
    //不包含边界值
    return Math.round(Math.random() * (diff - 2) + min + 1);
  } else if (type === -1) {
    //包含左边界值
    return Math.floor(Math.random() * diff + min, 10);
  } else if (type === 1) {
    //包含右边界值
    return Math.round(Math.random() * (diff - 1) + min) + 1;
  } else {
    //包含边界值，默认类型
    return Math.round(Math.random() * diff + min);
  }
}

/**
 * 16进制颜色值转为RGB格式色值
 * @param {String} color 16进制色值
 * @return {String} RGB格式色值
 */
function toRGB(color) {
  const reg = /#([0-9a-f]{3}){1,2}/gi;
  if (reg.test(color)) {
    color = color.replace('#', '');
    if (color.length === 3) {
      color = color
        .split('')
        .map((item) => item + item)
        .join('');
    }
    return (
      'rgb(' +
      color
        .split(/(.{2})/gi)
        .filter((item) => item)
        .map((item) => parseInt(item, 16))
        .join(',') +
      ')'
    );
  } else {
    return '';
  }
}

/**
 * 浏览器下载
 * @param {String|DOMObject} content 要下载的内容，如果为图片则是一个dom对象
 * @param {String} filename 下载文件的标题
 * @param {String} ext 文件扩展名
 */
function download(content, filename, ext) {
  const a = document.createElement('a');
  a.download = filename;
  a.style.display = 'none';

  if (ext === 'jpg' || ext === 'png') {
    ext === 'jpg' && (ext = ext.replace('jpg', 'jpeg'));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // const width = content.naturalWidth;
    // const height = content.naturalHeight;
    ctx.drawImage(content, 0, 0);
    a.href = canvas.toDataURL(`image/${ext}`);
  } else {
    const blob = new Blob([content]);
    a.href = URL.createObjectURL(blob);
  }

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

exports = module.exports = {
  traverse,
  traverseSync,
  sendEmail,
  typeOf,
  escapeRegExp,
  add,
  randomBetween,
  download,
  toRGB
};
