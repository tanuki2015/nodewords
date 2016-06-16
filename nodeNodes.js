//http模块
//var http = {
//
//    ServerRequest: {
//        url:"除主机名之外的url参数",
//        method:"http请求的方法，get，post等...",
//        headers:{/*http请求头的内容*/}
//    },
//
//    ServerResponse: {
//        writeHead: function(statusCode, [headers]){
//        // 给请求的客户端发送响应头
//        statusCode = 200;
//        headers = {'content-Type':'text/html'};
//        },
//        write: function(data, [encoding]){
//            //data是响应内容，buffer或字符串，encoding是编码，默认utf-8
//        },
//        end: function([data],[encoding]){/*告知客户端并结束响应*/},
//    },
//
//    createServer: function(){
//        emite('request', 'ServerRequest', 'ServerResponse' );
//    },
//
//    listen: function(){},
//
//
//}

var util = require('util');
var events = require('events');

function Person(){
    this.name = "xf";
}

util.inherits(Person, events);

var p1 = new Person();
p1.on('start', function(who){console.log("p1 event start" + who)});
p1.on('end', function(){console.log("p1 event end")});
p1.emit('start','xxff');
p1.emit('end');
p1.emit('end');