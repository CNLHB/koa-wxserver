const router = require('koa-router')()
const {Auth} = require('../../../middlewares/auth')

router.get('/', new Auth().m, async (ctx, next) => {
   ctx.body = {
    title: 'Hello Koa 2!',
    code: ctx.auth.uid
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
