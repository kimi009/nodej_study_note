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
  let {
    userName,
    password,
    code
  } = ctx.request.body;
  if (code === ctx.session.code) {
    console.log(tools.md5('123456'))
    let res = await db.findOne('admin', {
      "userName": userName,
      "password": tools.md5(password)
    });
    if (res) {
      ctx.session.userinfo = res;
      //登录成功
      await db.update('admin', {
        '_id': db.getObjectId(res._id)
      }, {
        loginDate: new Date()
      })
      await ctx.redirect('/admin')
    } else {
      // await ctx.render('admin/login', {
      //   uName: username,
      //   codeError: true
      // });
      await ctx.render('admin/error', {
        message: '用户名或密码错误',
        redirect: ctx.state.__HOST__ + '/admin/login'
      });
    }
  } else {
    // await ctx.render('admin/login', {
    //   uName: username,
    //   codeError: true
    // });
    await ctx.render('admin/error', {
      message: '验证码错误',
      redirect: ctx.state.__HOST__ + '/admin/login'
    });
  }
})

router.get('/logout', async(ctx) => {
  ctx.session.userinfo = null;
  ctx.redirect(`${ctx.state.__HOST__}/admin/login`)
})
module.exports = router.routes();