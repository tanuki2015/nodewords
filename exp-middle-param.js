const express = require('express');
const app = express();

// query查询字符串， 访问这个地址，http://localhost:8080/query?name=fofofo&age=5，可取出问好后的对象
// 得到{"name":"fofofo","age":"5"}
app.get('/query', (req, res) => {
  res.send(req.query);
});

// 去路径中的参数对象 http://localhost:8080/article/2/xf
// 得到 {"id":"2","name":"xf"}
app.get('/article/:id/:name', (req, res) => {
  res.send(req.params);
});

// send方法参数不能是数字，要返回状态码用sendStatus(status)
app.get('/user/:id/:name', (req, res) => {
  res.send(req.params);
  res.sendStatus(200);
});

// send方法是对res.write和end的扩展，自动处理字符串和对象。
app.all('*', (req, res) => {
  res.send('这个页面走丢了');
});


app.listen(8080);
