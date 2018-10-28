const router = require('koa-router')(),
  login = require('./admin/login'),
  user = require('./admin/user');

router.use(async(ctx, next) => {
  //权限判断
  if (ctx.session.userinfo) {
    if (/login/gi.test(ctx.url)) {
      ctx.redirect("/admin")
    } else {
      await next();
    }
  } else {
    if (/login/gi.test(ctx.url)) {
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

module.exports = router.routes();