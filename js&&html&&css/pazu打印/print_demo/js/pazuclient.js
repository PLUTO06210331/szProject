/*
PAZU 客户端js。需要html中引入本文件
*/
if (!window.PAZU_Config) {
    window.PAZU_Config = {
        prot:"http",
        server: 'localhost.pazu.4fang',   //注意，因为安全理由必须更改hosts文件，把localhost.pazu.4fang指向127.0.0.1（安装程序会自动添加，杀毒软件可能会阻止这个过程）
        port: 6894,
        license:''
    }
}

try{
    window.PAZU_Config.host = (window.location.href.replace('//', '').split(':')[1]).split('/')[0];
}catch(ex){}
var ws=null;
var bWsReady=false;
if(!!window.WebSocket && window.WebSocket.prototype.send){
    try{
        ws = new WebSocket("ws://" + window.PAZU_Config.server + ":" + window.PAZU_Config.port);
    }catch(ex){
        //新版本的IE、firefox等浏览器都允许通过websocket链接localhost  :( 
        console.log("websock create failed,change to http");
    }
}
if (ws) {
    ws.onopen = function (evt) {
        //get url:"/js/pazucloud.js",
        ws.send('{"f":"pazu","a":"init","d":{"pa":"init","license":"' + encodeURIComponent(PAZU_Config.license) + '","server":"' + encodeURIComponent(PAZU_Config.host) + '"}}');
    };

    ws.onmessage = function () {
        bWsReady=true; 
        var o = JSON.parse(arguments[0].data);//'{"f":"phone","a":"init","d":"ok"}');
        if (o) {
            if (o.e) {
                alert("Error[" + o.f + "." + o.a + "]:" + o.e)
            } else {
                //PAZU还支持 呼叫中心 的电话坐席API 和 加密锁插入拔出的监测
                /*
                if (o.f == 'phone') {
                    if (o.a == 'init') {
                        if (o.d == 'ok') { alert("电话机链接成功") }
                    } else if (o.a == 'callin') {
                        alert("电话打进来了：" + o.d)
                    }
                } else if (o.f == 'dog') {
                    if (o.a == 'insert') {
                        alert(o.d.DogInfo.split('\t'));
                    } else if (o.a == 'remove') {
                        alert("dogRemove")
                    }
                }*/
                if (o.f == 'pazu') {
                    if (o.a == 'init') {
                        //alert(o.d);
                        eval(o.d);
                    }
                }
            }
        }
        ws.close();
    };
    //错误处理

    ws.onerror = function (ev) {
        if(bWsReady){
            if(ws.readyState<2)alert("client.pazu.websock.onerror");
        }else{
            console.log("websock create failed,change to http");
            createHTTP4PAZU();
        }
    }

} else {
    createHTTP4PAZU();
}

function createHTTP4PAZU(){
    var _tag = document.createElement('script');
    _tag.type = 'text/javascript';
    _tag.async = true;
    _tag.charset = 'utf-8';
    _tag.src = (PAZU_Config.prot + "://" + PAZU_Config.server + ":" + (PAZU_Config.port ? PAZU_Config.port : 6894) + "/js/pazucloud.js?server=" + encodeURIComponent(PAZU_Config.host) + "&license=" + encodeURIComponent(PAZU_Config.license) + "&_t=" + Math.random());

    try {
        var _rootE = document.getElementsByTagName('script')[0];
        _rootE.parentNode.insertBefore(_tag, _rootE);
    } catch (ex) {
        alert("PAZU add reference error:" + ex.message);
    }
}