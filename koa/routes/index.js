const router = require('koa-router')();

router.get('/', async(ctx) => {
  await ctx.render('admin/index')
})


module.exports = router.routes();