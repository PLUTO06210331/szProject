var fs = require('fs');

// stream 流

//打开一个流
var rs = fs.createReadStream('stream.txt','utf-8');

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

