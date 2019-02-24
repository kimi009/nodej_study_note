const router = require('koa-router')(),
  db = require('../../model/DbHelper/db'),
  tools = require('../../model/tools');

router.get('/', async(ctx) => {
  let res = await db.find('articlecate', {});
  await ctx.render('admin/articlecate/list', {
    articlecates: tools.generateTree(res)
  })
})

router.get('/add', async(ctx) => {
  var result = await db.find('articlecate', {
    'pid': '0'
  });


  await ctx.render('admin/articlecate/add', {

    catelist: result
  });
})

router.post('/doAdd', async(ctx) => {

  //console.log(ctx.request.body);

  var addData = ctx.request.body;
  addData.status = addData.status == 1;
  var result = await db.insertOne('articlecate', addData);

  ctx.redirect(ctx.state.__HOST__ + '/admin/articlecate');

})

router.get('/edit', async(ctx) => {


  var id = ctx.query.id;

  var result = await db.findOne('articlecate', {
    "_id": db.getObjectId(id)
  });

  var articlecate = await db.findOne('articlecate', {
    'pid': '0'
  });

  result.status = result.status ? 1 : 0;
  await ctx.render('admin/articlecate/edit', {

    list: result,
    catelist: articlecate
  });

})


router.post('/doEdit', async(ctx) => {

  //console.log(ctx.request.body);
  let {
    id,
    title,
    pid,
    keywords,
    status,
    description
  } = ctx.request.body;
  // var editData=ctx.request.body;
  // var id=editData.id;       /*前台设置隐藏表单域传过来*/
  // var title=editData.title;
  // var pid=editData.pid;
  // var keywords=editData.keywords;
  // var status=editData.status;
  // var description=editData.description;
  status = status == 1;
  var result = await db.update('articlecate', {
    '_id': db.getObjectId(id)
  }, {
    title,
    pid,
    keywords,
    status,
    description
  });

  ctx.redirect(ctx.state.__HOST__ + '/admin/articlecate');

})

router.get('/delete', async(ctx) => {

  let {
    id
  } = ctx.query;
  var result = await db.findOne('articlecate', {
    "_id": db.getObjectId(id)
  });
  if (result.pid == 0) {
    var res = await db.find('articlecate', {
      "pid": result._id.toString()
    });
    if (res.length) {
      await db.deleteMany('articlecate', {
        'pid': result._id.toString()
      })
    }
  }
  await db.deleteOne('articlecate', {
    '_id': db.getObjectId(id)
  });
  await ctx.redirect('/admin/articlecate')

})

module.exports = router.routes();