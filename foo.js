/**
 * Created by neo on 2016/2/29.
 */
//var _ = require("underscore");
//_.each([1,2,3],function(num){
//    console.log("underscore.js says " + num);
//});

    //一个服务端的案例
//var http = require("http"),
//    url = require("url");
//
//http.createServer(function(req,res){
//    var pathname = url.parse(req.url).pathname;
//
//    if(pathname === '/'){
//        res.writeHead(200,{
//            'content-type': 'text/plain'
//        });
//        res.end('Home page\n')
//    }else if (pathname === '/about'){
//        res.writeHead(200,{
//            'Content-Type': 'text/plain'
//        });
//        res.end('About us\n');
//    }else {
//        res.writeHead(404,{
//            'Content-type': 'text/p;ain'
//        });
//        res.end('page not found\n')
//    }
//}).listen(3000,"127.0.0.1");
//

//console.log('Server running at http://127.0.0.1:3000');
//
////一个客户端案例
//var http = require('http');
//
//var option = {
//    host: 'baidu.com',
//    port: 80,
//    path: '/'
//};
//
//http.get(option,function(res){
//    if(res.statusCode == 200){
//        console.log("the site is up!");
//    }
//    else{
//        console.log('the site is down!');
//    }
//}).on('error',function(e){
//    console.log('there was an error: ' + e.message);
//});
var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');
//var server = http.createServer();
//
//server.on('request',function(req,res){
//    res.writeHead(200, {'content-Type':'text/html'});
//    res.write('<h1>Node.js</h1>');
//    res.end('<p>Hello world</p>');
//});
//
//server.listen(3000);
//http.createServer(function(req,res){
//    res.writeHead(200, {'content-Type':'text/html'});
//    res.write('<h1>Node.js</h1>');
//    res.write('<p>'+ util.inspect(req.headers) +'</p>');
//    res.write('<p>'+ req.method +'</p>');
//    res.write('<p>'+ util.inspect(url.parse(req.url)) +'</p>');
//    var urlObj = url.parse(req.url,true);
//    res.end(urlObj.toString());
//
//}).listen(3000);

//fs.readFile('nodeNotes.md',function(err,data){
//    if(err){
//        console.error(err);
//    }else{
//        fs.writeFile('./nodeNotesCopy.md', data,function(err,data){
//            if(err){
//                console.error(err);
//            }
//        })
//    }
//})

//var buf = new Buffer(3);
//buf[0] = 1;
//buf[1] = 2;
//buf[2] = 3;
//
//var buf2 = new Buffer([4,5,6]);
//console.log(buf);
//console.log(buf2);
//
//var tarBuf = new Buffer(6);
//buf.copy(tarBuf,0,0,3);
//console.log(tarBuf);
//tarBuf.copy(tarBuf,3,0,3);
//console.log(tarBuf);

//var buf1 = new Buffer([1,2,3]);
//var buf2 = new Buffer([4,5,6]);
//var newBuf = concat([buf1,buf2]);
//console.log(newBuf);
//
//function concat(Array,length){
//    length = "undefined"? 6: length;
//    var tempBuf = new Buffer(length);
//    var countBit = 0;
//    Array.forEach(function(item){
//        item.copy(tempBuf,countBit,0,item.length);
//        countBit += item.length;
//    });
//    return tempBuf;
//}

//fs.readFile('1.txt','utf8',function(err,data){
//    console.log(data);
//});

//fs.appendFile('1.txt','\nwrite the 4td line!','utf8',function(err){
//    console.log(err);
//});
function copy(srcFile,tarFile,readLength,paragraph){
    var srcFd = fs.openSync(srcFile,'r');
    var tarFd = fs.openSync(tarFile,'a+');
    var bufList = [];

    paragraph == undefined? 10: paragraph;

    console.log(readLength);
    if(readLength == undefined){
        readLength = 4;
    }

    function read(){
        var buf = new Buffer(readLength);
        var bytesRead = fs.readSync(srcFd,buf,0,readLength);

        bufList.push(buf);

        if(bytesRead == 0){
            bufList.pop();
            write();
        }else if(bufList.length == paragraph){
            write();
            bufList = [];
            read();
        }else{
            read();
        }
    }
    read();

    function write(){
        bufList.forEach(function(item){
            fs.writeSync(tarFd,item,0,readLength);
        })
    }

}

copy('1.txt','2.txt');