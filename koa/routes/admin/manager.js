const router = require('koa-router')(),
  db = require('../../model/DbHelper/db'),
  tools = require('../../model/tools');

router.get('/', async(ctx) => {
  let res = await db.find('admin', {});
  // console.log(res)
  await ctx.render('admin/manager/list', {
    managers: res
  })
})

router.get('/add', async(ctx) => {
  await ctx.render('admin/manager/add')
})

router.post('/doAdd', async(ctx) => {
  //获取表单数据
  //验证表单数据是否合法
  //在数据库查询当前要增加的管理员是否存在
  // 增加管理员
  let userName = ctx.request.body.userName,
    pwd = ctx.request.body.password,
    rpwd = ctx.request.body.passwordSure;
  if (!/^[\u4e00-\u9fa5a-zA-Z0-9\-]{2,20}$/.test(userName)) {
    //用户名不合法
    await ctx.render('admin/error', {
      message: '用户名不合法',
      redirect: ctx.state.__HOST__ + '/admin/manager/add'
    });
  } else if (pwd !== rpwd || pwd.length > 6) {
    //密码不合法
    await ctx.render('admin/error', {
      message: '密码输入不一致或是密码超过6位！',
      redirect: ctx.state.__HOST__ + '/admin/manager/add'
    });
  } else {
    let res = await db.findOne('admin', {
      userName: userName
    });
    if (res) {
      await ctx.render('admin/error', {
        message: '此管理员已经存在',
        redirect: ctx.state.__HOST__ + '/admin/manager/add'
      });
    } else {
      let addRes = await db.insertOne('admin', {
        userName,
        password: tools.md5(pwd),
        loginDate: new Date(),
        state: false
      })
      if (addRes) {
        ctx.redirect(ctx.state.__HOST__ + '/admin/manager')
      } else {
        await ctx.render('admin/error', {
          message: '添加失败',
          redirect: ctx.state.__HOST__ + '/admin/manager/add'
        });
      }
    }
  }
})

router.get('/edit', async(ctx) => {
  let {
    id
  } = ctx.query;
  let res = await db.findOne('admin', {
    '_id': db.getObjectId(id)
  });
  await ctx.render('admin/manager/edit', {
    info: res
  })
})

router.post('/doEdit', async(ctx) => {
  let {
    id,
    password,
    passwordSure
  } = ctx.request.body;
  if (!password || password !== passwordSure) {
    await ctx.render('admin/error', {
      message: '前后密码不一致',
      redirect: `${ctx.state.__HOST__}/admin/manager/edit?id=${id}`
    })
  } else {
    let res = await db.update('admin', {
      '_id': db.getObjectId(id)
    }, {
      password: tools.md5(password)
    })
    if (res.result.ok > 0) {
      await ctx.redirect('/admin/manager')
    } else {
      await ctx.render('admin/error', {
        message: '更新失败',
        redirect: `${ctx.state.__HOST__}/admin/manager/edit?id=${id}`
      })
    }
  }
})

router.get('/delete', async(ctx) => {
  let {
    id
  } = ctx.query;
  await db.deleteOne('admin', {
    '_id': db.getObjectId(id)
  });
  await ctx.redirect('/admin/manager')
})

module.exports = router.routes();