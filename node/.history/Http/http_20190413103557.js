var http = requir('http');


var server = http.createServer(function(request,response){
    //回调函数接受request和response对象
    //获得HTTP请求的method和url
    console.log(request.method +':'+ request.url);
})