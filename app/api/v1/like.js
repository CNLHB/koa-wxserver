const router = require('koa-router')()
const {Auth} = require('../../../middlewares/auth')
const { LikeValidator } = require('../../validator/validator')
const { Favor } = require("../../models/favor")

router.prefix('/v1/like')
router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {id: 'art_id'})
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    ctx.body = {
        code: 201,
        msg: '点赞成功',
        data: []
  }
})
router.post('/cancel', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {id: 'art_id'})
    await Favor.disLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    ctx.body = {
        code: 201,
        msg: '取消成功',
        data: []
  }
})

module.exports = router
