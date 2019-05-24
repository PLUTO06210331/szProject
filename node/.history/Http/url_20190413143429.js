var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

    var root = path.resolve(process.argv[2] || '.');
    console.log('Static root dir:' + root);

    var server = http.createServer(function(request, response){
        var pathName = url.parse(request.url).pathname;
        var filePath = path.join(root,pathName);
        fs.stat(filePath,function(err,data))
    })
