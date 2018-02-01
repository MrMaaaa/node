// var request = require('request');
// var mail = require('nodemailer');

// var smtpTransport = mail.createTransport({
//   host: 'smtp.qq.com',
//   secureConnection: true,
//   port: 587, //腾讯端口为465或587
//   auth: {
//     user: 'tenfyma@foxmail.com',
//     pass: 'otiiohqmkqnfbeii'
//   }
// });

// //设置邮箱内容
// var mailOptions = {
//   from: '马腾飞 <tenfyma@foxmail.com>',
//   to: '1254756515@qq.com', //收件人，多个收件人用逗号隔开
//   subject: 'nodeJS mailer', //标题
//   text: 'Send a mail from nodeJS', //文本格式内容
//   //html: '<img src="./doge.jpg">', //html格式内容
//   /*attachments: [{ //上传附件
//     filename: 'json',
//     path: './add.html'
//   }]*/
// };

// smtpTransport.sendMail(mailOptions, function(error, response) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('success' + response.response);
//   }
//   smtpTransport.close();
// });

var mutil = require('../modules/MUtils.js');

mutil.sendEmail({
  receiver: '986886331@qq.com',
  title: '发送测试',
  text: '测试正文'
});