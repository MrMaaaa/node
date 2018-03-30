const sendEmail = require('../../modules/utils.js');

sendEmail.sendEmail({
  from: '马腾飞 <tenfyma@foxmail.com>',
  to: '1254756515@qq.com',
  subject: '测试标题',
  text: '测试正文'
});