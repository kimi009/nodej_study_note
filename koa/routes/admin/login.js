const router = require('koa-router')(),
  tools = require('../../model/tools'),
  db = require('../../model/DbHelper/db')

router.get('/', async(ctx) => {
  await ctx.render('admin/login');
})

router.post('/dologin', async(ctx) => {
  // console.log(tools.md5('123456'));
  let {
    username,
    password
  } = ctx.request.body;

  let res = await db.find('admin', {
    "username": username,
    "password": tools.md5(password)
  });
  if(res.length){
    ctx.session.userinfo = res[0];
    await ctx.redirect('/admin')
  }else{
    await ctx.render('admin/login')
  }
})

module.exports = router.routes();