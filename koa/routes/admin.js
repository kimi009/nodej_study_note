const router = require('koa-router')(),
  url = require('url'),
  login = require('./admin/login'),
  manager = require('./admin/manager')
  user = require('./admin/user');

router.use(async(ctx, next) => {
  let pathname = url.parse(ctx.request.url).pathname.substring(1);
  let urlSplit = pathname.split('/');
  ctx.state.G = {
    userinfo: ctx.session.userinfo,
    urlParams:urlSplit
  }
  //权限判断
  if (ctx.session.userinfo) {
      await next();
  } else {
    if (pathname === 'admin/login' ||
        pathname === 'admin/login/dologin' || 
        pathname === 'admin/login/code') {
      await next();
    } else {
      //没登陆
      ctx.redirect("/admin/login")
    }
  }
})

router.get('/', async(ctx) => {
  await ctx.render('admin/index')
})

router.use('/login', login)
router.use('/user', user)
router.use('/manager', manager)

module.exports = router.routes();