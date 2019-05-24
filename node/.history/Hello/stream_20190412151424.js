var fs = require('fs');

// stream 流

//打开一个流
var rs = fs.createReadStream('stream.txt','utf-8');  //读取流文件
var ws = fs.createWriteStream('stream.txt','utf-8'); //写入流文件

rs.on('data',function(chunk){
    console.log('DATA:');
    console.log(chunk);
})

rs.on('end',function(){
    console.log('END:')
})

rs.on('err',function(err){
    console.log('ERROR:' + err);
})


ws.write('使用stream写入文本数据...\n','utf-8')

