var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/reg', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('reg', { title: '用户注册' });
});

router.post('/reg', function(req, res, next) {
  // res.send('respond with a resource');
  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('login', { title: '用户登录' });
});

router.post('/login', function(req, res, next) {
  // res.send('respond with a resource');
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  // res.send('respond with a resource');
  res.redirect('/');
});

module.exports = router
