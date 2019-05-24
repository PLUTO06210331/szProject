var fs = require('fs');

var rs = fs.createReadStream('rs.txt');
var ws = fs.createWriteStream('ws.txt');

rs.pipe(ws);

console.log('程序执行完毕');