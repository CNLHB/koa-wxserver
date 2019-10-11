const router = require('koa-router')()

router.get('/', async (ctx, next) => {

    try {
        
    } catch (error) {
        throw new Error("出错了")

    }    
   ctx.body = {
    title: 'Hello Koa 2!',
    code: ctx.path
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
