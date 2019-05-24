var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');

    //命令行获取root目录，默认当前目录
    var root = path.resolve(process.argv[2] || '.');
    console.log()