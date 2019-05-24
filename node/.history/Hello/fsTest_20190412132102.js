var fs = require('fs');

//readFile 异步读取文件  //readFilesync 同步读取文件

fs.readFile('testDoc.txt','utf-8',function(err,data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})