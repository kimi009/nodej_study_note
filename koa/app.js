const Koa = require('koa'),
  router = require('koa-router')(),
  render = require('koa-art-template'),
  path = require('path'),
  static = require('koa-static'),
  session = require('koa-session'),
  bodyparser = require('koa-bodyparser'),
  index = require('./routes/index.js'),
  admin = require('./routes/admin.js'),
  api = require('./routes/api.js'),
  sd = require('silly-datetime'),
  jsonp = require('koa-jsonp');

const app = new Koa();

//配置session
app.keys = ['my first koa project'] //签名
const CONFIG = {
  key: 'koa:sess', //默认
  maxAge: 864000, // 过期时间
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true, // 每次请求都强制设置cookie
  renew: false
};
app.use(session(CONFIG, app))

app.use(jsonp());

//配置koa-bodyparser
app.use(bodyparser());

//配置koa-art-template模板引擎
render(app, {
  root: path.join(__dirname, 'views'), // 表示视图的位置
  extname: '.html', // 表示后缀名是什么
  dateFormat: dateFormat = function (value) {
    return sd.format(value, 'YYYY-MM-DD HH:mm:ss')
  },
  debug: process.env.NODE_ENV != 'production' // 是否开启调试模式
})

//配置全局状态中间件
app.use(async(ctx, next) => {
  ctx.state.__HOST__ = 'http://' + ctx.request.header.host

  await next()
})
//配置静态资源中间件  koa中的静态资源中间件可以配置多个
app.use(static(__dirname + '/public/'))

router.use('/admin', admin)
router.use('/api', api)
router.use(index);


app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8108, '127.0.0.1')