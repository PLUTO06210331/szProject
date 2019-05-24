var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

    //命令行获取root目录，默认当前目录
    var root = path.resolve(process.argv[2] || '.');

    var server = http.createServer(function(resolve,response){
        var pathName = url.parse(resolve.url).pathname;
        var fileName = path.join(root,pathName);
        fs.stat(fileName,function(err,data){
            if(!err&&data.isFile()){
                console.log('200'+ request.url);
            }
        })
    })