const router = require('koa-router')();

const db = require('../../model/DbHelper/db')

router.get('/', async(ctx) => {
  await ctx.render('admin/index')
})

router.get('/changeStatus', async(ctx) => {
  let collectionName = ctx.query.collectionName,
    attr = ctx.query.attr,
    id = ctx.query.id;

  let data = await db.findOne(collectionName, {
    '_id': db.getObjectId(id)
  });
  if (data) {
    let json = {
      [attr]: !data[attr]
    }
    let updateRes = await db.update(collectionName, {
      '_id': db.getObjectId(id)
    }, json)
    if (updateRes.result.ok > 0) {
      ctx.body = {
        message: '更新成功'
      }
    } else {
      ctx.body = {
        message: '更新失败'
      }
    }
  } else {
    ctx.body = {
      'message': '参数错误'
    }
  }
})


module.exports = router.routes();