var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

    //命令行获取root目录，默认当前目录
    var root = path.resolve(process.argv[2] || '.');
    console.log(root)
    var server = http.createServer(function(request,response){
        console.log(url.parse(request.url).pathname);
        var pathName = url.parse(request.url).pathname;
        var fileName = path.join(root,pathName);
        fs.stat(fileName,function(err,data){
            if(!err&&data.isFile()){
                console.log('200'+ request.url);
                response.writeHead(200);
                fs.createReadStream(fileName).pipe(response);
            }else{
                // 出错了或者文件不存在:
                console.log('aaaa');
                console.log('404 ' + request.url);
                // 发送404响应:
                response.writeHead(404);
                response.end('404 Not Found');
            }
        })
    })
    server.listen(8080);
    console.log('Server is running at http://127.0.0.1:8080/');