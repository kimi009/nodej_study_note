var express = require('express');

var app = express();



//默认的session 是保存在服务器文件中的 
//正规的是保存在数据库中的， 为什么要这么做
// 主要是针对负载均衡 防止登陆信息丢失

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: 'keyboard cat', //随机字符串  服务端生成session的签名
  resave: false, //是否强制保存session 没有变化不保存， 变化才保存
  saveUninitialized: true, //强制将未初始化的session保存 
  cookie: {
    // secure:  //只有在http 这样的情况才可以使用
    maxAge: 10 * 1000 //30秒过期
  },
  rolling: true, //设置过期时间是30分钟  如果用户在30分钟内一直访问浏览器 则不过期 只要在30分钟内没操作过则到30分钟后自动过期
  store: new MongoStore({
    url: 'mongodb://127.0.0.1:27017/student', //数据库地址
    touchAfter: 24 * 3600, //二十四小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
    autoRemove: 'native'
  })
}))

app.get('/', (req, res) => {
  if (req.session.userInfo) {
    res.send('你好' + req.session.userInfo)
  } else {
    res.send('未登录');
  }
});

app.get('/login', (req, res) => {
  req.session.userInfo = '张三';
  res.send('登陆成功')
})

app.get('/logout', (req, res) => {
  //退出登录
  //1  req.session.cookie.maxAge = 0 //这样可以马上销毁
  //2  req.session.destroy()
  req.session.destroy(() => {
    console.log('销毁');

  })
  res.send('退出成功');
})

app.listen(3000);