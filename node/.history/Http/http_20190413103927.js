var http = requir('http');


var server = http.createServer(function(request,response){
    //回调函数接受request和response对象
    //获得HTTP请求的method和url
    console.log(request.method +':'+ request.url);

    //将http响应写入response，设置Content-Type: text/html
    response.writeHead(200,{'Content-Type': 'text/html'});

    //讲HTTP响应的html内容写入response
    response.end('<h1>Hello world</h1>')
})