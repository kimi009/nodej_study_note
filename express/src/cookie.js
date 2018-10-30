const express = require('express')

const bodyParse = require('body-parser')

const cookieParser = require('cookie-parser')

const app = new express();

app.use(bodyParse.urlencoded({
  extended: false
}));

app.use(bodyParse.json())

app.use(cookieParser('sign'));

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  console.log(req.cookies);
  console.log(req.signedCookies);
  
  res.send('ok')
})
app.get('/test', function (req, res) {
  console.log(req.cookies);
  res.send('oo')
})

app.get('/set', function (req, res) {
  res.cookie('username', 'cookie的值', {
    maxAge: 60000, //过期时间
    // httpOnly: true,//只有在nodejs服务端里面才可以访问，客户端js不能操作
    // path: '/test', //表示在制定的路由下才能访问cookie
    // domain: '.t.com', //配置二级域名共享cookie信息
    signed: true //cookie 加密
  })
  res.send('设置成功')
})


app.listen(3008, '127.0.0.1')