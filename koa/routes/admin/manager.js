const router = require('koa-router')(),
  db = require('../../model/DbHelper/db');

router.get('/', async(ctx) => {
  let res = await db.find('admin',{});

  await ctx.render('admin/manager/list')
})

router.get('/add', async(ctx) => {
  await ctx.render('admin/manager/add')
})


module.exports = router.routes();