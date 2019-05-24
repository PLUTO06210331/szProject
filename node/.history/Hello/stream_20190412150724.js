var fs = require('fs');

// stream 流

//打开一个流
var rs = fs.createReadStream('testDoc.txt','utf-8');

rs.on('data',function(chunk){
    console.log('DATA:');
    console.log(chunk);
})

rs.end('end',function(){
    console.log('END:')
})

re.on('err',function(err){
    console.log()
})

