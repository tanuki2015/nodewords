# http模块
http模块包含:
1. 服务器部分http.server
2. 客户端部分: 仅由http.request 和 http.get 这两个方法构成。

## 服务器端
http.createServer方法用于创建并返回一个http服务器的实例。
```
var http = require('http');
var server = http.createServer();
```
拿到server实例后，让server监听request事件：
`server.on('request',function(req,res){});`

当request到达的时候，会回调这个listener函数，并传入http.ServerRequest和http.ServerResponse两个对象，以供其使用。如何处理request的逻辑就写在这个函数中。

下面是一段完整的示例：
```
var http = require('http');
var server = http.createServer();

server.on('request',function(req,res){
    res.writeHead(200, {'content-Type':'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello world</p>');
});

server.listen(3000);
```

因为写得太多，为了简化，于是在拿到server实例的时候，可以直接传入listener,默认监听request事件:
```
http.createServer(function(req,res){
    res.writeHead(200, {'content-Type':'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello world</p>');
}).listen(3000);
```
### 关于http.ServerRequest和http.ServerResponse对象
ServerRequest的常用属性（为简化，后面用req代替ServerRequest）：

#### req.url包含原始请求路径，不包括主机名部分。
```
http.createServer(function(req,res){
    res.writeHead(200, {'content-Type':'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>'+ req.url +'</p>');
}).listen(3000);
```
也可以用url模块把url解析成一个对象：
```
res.end('<p>'+ url.parse(req.url) +'</p>');
//输出是object，再用util.inspect转换一下：
res.end('<p>'+ util.inspect(url.parse(req.url)) +'</p>');
```
#### req.method包括get，put等http方法。
`    res.write('<p>'+ req.method +'</p>');
`
#### req.headers包含每个http头的所有属性，用util.inspect来解析其对象可以看到：
```
var util = require('util');
...
res.write('<p>'+ util.inspect(req.headers) +'</p>');
...
```

#### 如何取得request的数据？
如果是get方法，上面解析url就能得到请求头部。
如果是post方法，需要得到请求体，于是ServerRequest对象提供了3个事件用于对请求体的操作：
1. data 事件，当侦听data事件时，数据分块传来，只要有一个chunk传来，就会触发data事件，并提供给listener一个chunk参数,于是我们可以这样：
```
var post = '';
req.on('data',function(chunk){
    post += chunk;
    })；
```
post拿到了请求体。
2. end 事件，数据传输完成时候发生。
```
req.on('end',function(){
    res.end(post);
    })
```
3. close 事件，当用户终止传输时发生。

上面拿到请求体的方法只是演示，通常无需对请求体做出处理。

### 作为http客户端（假装我是浏览器？）
提供两个方法： http.request 和 http.get
需要用的时候再看吧，后面省略......
