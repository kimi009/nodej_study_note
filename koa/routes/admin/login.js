const router = require('koa-router')(),
  tools = require('../../model/tools'),
  db = require('../../model/DbHelper/db'),
  svgCaptcha = require('svg-captcha');

router.get('/', async(ctx) => {
  await ctx.render('admin/login');
})

router.get('/code', async(ctx) => {
  let captcha = svgCaptcha.createMathExpr({
    size: 6,
    noise: 3,
    width: 120,
    height: 33,
    color: true,
    background: '#cc9966'
  });
  ctx.session.code = captcha.text;
  ctx.response.type = 'image/svg+xml'
  ctx.body = captcha.data;
})

router.post('/dologin', async(ctx) => {
  // console.log(tools.md5('123456'));
  let {
    username,
    password,
    code
  } = ctx.request.body;
  if (code === ctx.session.code) {
    let res = await db.find('admin', {
      "username": username,
      "password": tools.md5(password)
    });
    if (res.length) {
      ctx.session.userinfo = res[0];
      await ctx.redirect('/admin')
    } else {
      await ctx.render('admin/login')
    }
  } else {
    console.log('验证码失败')
    await ctx.render('admin/login', {
      codeError: true
    });
  }
})

module.exports = router.routes();