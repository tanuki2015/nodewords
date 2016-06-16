const express = require('express')
const app = express()
// 使用中间件 next方法必须没有参数，否则表示出错，被错误处理中间件捕获
app.use((req, res, next) => {
  res.money = 100;
  next();
})

app.use((req, res, next) => {
  res.money = res.money - 20;
  next('money has lost');
})

app.use((req, res, next) => {
  res.money = res.money - 20;
  next();
})

app.use((req, res, next) => {
  res.end("" + res.money);
})

// 中间件出错的话，交给错误处理中间件处理 只是多了一个err的参数的中间件
app.use((err,req,res,next) => {
  console.log('钱丢了')
  res.end(err);
})

app.listen(8080);
