var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var port = 3000;
var MIME_TYPE = {
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'swf': 'application/x-shockwave-flash',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/x-wav',
    'wma': 'audio/x-ms-wma',
    'wmv': 'video/x-ms-wmv',
    'xml': 'text/xml'
};

http.createServer(function(req, res) {
    var filePath;
    if (req.url === '/') {
        filePath = 'index.html';
    } else {
        filePath = '.' + url.parse(req.url).pathname; //静态资源路径
    }

    fs.exists(filePath, function(exist) {
        if (!exist) {
            //send404(res);
        } else {
            var ext = path.extname(filePath); //获取资源扩展名
            ext = ext ? ext.slice(1) : 'unknown'; //去掉扩展名的点
            var contentType = MIME_TYPE[ext] || 'text/plain'; //设置类型

            fs.readFile(filePath, function(err, data) {
                if (err) {
                    res.end('<h1>500</h1>服务器内部错误！');
                } else {
                    res.writeHead(200, {
                        'content-type': contentType
                    });
                    res.end(data.toString());
                }
            });
        }
    });

}).listen(port);


//手动关闭端口：taskkill /F /IM node.exe
