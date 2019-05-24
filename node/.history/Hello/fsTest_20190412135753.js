var fs = require('fs');

//readFile 异步读取文件  //readFilesync 同步读取文件


//异步获取文件
fs.readFile('testDoc.txt','utf-8',function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})

//同步获取文件
var data = fs.readFileSync('testDoc.txt','utf-8');
console.log(data);

//同步错误处理

try{
    var data = fs.readFileSync('testDoc.txt','utf-8');
    console.log(data);
} catch(err) {
    // .......
}



//writeFile 异步写文件  writeFileSync 同步写文件

//异步写文件
var data = 'Hello,Node'
fs.writeFile('testDoc.txt',data,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('OK');
    }
})

//同步写文件

var message = fs.writeFileSync('testDoc.txt',data)
console.log(message);


//start  用于获取文件大小，创建时间等信息

