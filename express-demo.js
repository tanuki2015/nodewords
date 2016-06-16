const express = require('express')
const app = express()

// 匹配路由
app.get('/', (req, res) => {
  res.send('list' + req.url);
});

app.post('/post', (req, res) => {
  res.send('post' + req.url);
});

app.all('*', (req, res) => {
  res.send('这个页面走丢了');
})

app.listen(8080);
