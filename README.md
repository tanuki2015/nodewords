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


## express 入门
把对象a的属性拷贝到b `Object.assign(b, a)`

### 路由控制
get方法
```
app.get(path, function(request, response))

// 匹配所有http请求
app.all()
```

### 中间件

获取请求的一些参数
- req.host 返回请求头里的主机名
- req.path 返回请求里的路径
- req.query 获取客户端get请求路径参数的对象
- req.params 路径参数对应的对象

### 模板引擎
```
// 指定模板引擎
app.set('view engine', 'jade');

// 设置存放模板的目录
app.set('view', path.join(__dirname, '/'));

// 渲染时，local对象 传入要用到的变量
res.render('views', [local], callback);

//  使用ejs来扩展html模板支持
app.set('view engine', 'ejs');
app.set('veiws', __dirname);
app.engine('html', require('ejs').__express);
app.get('/', (req, res) => {
  res.render('index', {
    name: "nicolas",
    age: 24,
    });
  });
```

### cookie
```
// server端在响应头设置cookie
Set-Cookie: name=nicolas


// 下面设置cookie， time是一个date类型，过期的表示时间限度
res.writeHead(200,{
  'Set-Cookie': 'name=nicolas; path=/; Expires=time'
  })

// writeHead只能写一次，所以可以用res.setHeader()方法多次设置
res.setHeader('Set-Cookie': 'name=nicolas; path=/; Expires=time');

// client端在请求中传入cookie，server再读取
Cookie: key1=value; key2=value2;

console.log(req.headers.cookie)

/
```

利用cookie的登陆demo
```
app.get('/login', (req, res) => {
  res.cookie('username', req.query.username); // 保存cookie
  res.redirect('/user'); // 重定向到user页面
  })

app.get('/user', (req, res) => {
  res.render('user', {user: req.cookies.username})
  })  

// 可以利用一个中间件来判断是否登陆
function isLogin() {
  if(req.cookies && req.cookies.username){
    next();
  }
  else{
    res.redirect('/');
  }
}  

app.get('/user', isLogin, (req, res) => {
  res.render('user', {user: req.cookies.username})
  })  

// 也可以把多个中间件放到数组中依次执行
```

### 加密
利用crypto模块实现加密
```
const crypto = require('crypto');

function getHash(str) {
  let shasum = crypto.createHash('sha1');
  return shasum.update(str).digest('base64'); // 可以用其他格式 如 hex 16进制
}

console.log(getHash('1'));
```

### 路由
路由主要处理get和post请求，格式都是如下
```
app.get('/', (req, res) => {...})
```
函数接受两个参数，路径和回调。回调有req请求信息和res响应信息。

req.query
```
// GET /index.html?name=article
req.query.name -> article
```

req.params
```
// Get /user/nicolas
req.params.name = nicolas
```

req.body
```
req.body.name
```

### 安装mongod之后的启动，非后台服务方式。
`mongod --config /usr/local/etc/mongod.conf`

可视化工具--Robomongo
