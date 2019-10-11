const router = require('koa-router')()
const {Auth} = require('../../../middlewares/auth')
const { Flow } = require("../../models/flow")
const { Art } = require("../../models/art")
const { NotFound } = require("../../../core/http-exception")
const { ClassicValidtor, PositiveIntegerValidator } = require('../../validator/validator')
const { Favor } = require("../../models/favor")
router.prefix('/v1/classic')

router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [['index','DESC']]
    })
    let art = await Art.getData(flow.art_id, flow.type)
    if(!art) {
        throw new NotFound("期刊不存在")
    }
    art.setDataValue('index', flow.index)
    // art.dataValues.index = flow.index
    ctx.body = art
})
router.get('/:index/previous', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id: 'index'
    });
    const id = v.get('path.index');
    const flow = await Flow.findOne({
        where: {
            index: index - 1 
        }
    })
    if(!flow) {
        throw new NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    if(!art) {
        throw new NotFound() 
    }
    const likePrevious = await Favor.userLikeIt(iflow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likePrevious)
    ctx.body = art
})

router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
    const v = await new ClassicValidtor().validate(ctx);
    const id = v.get('path.id');
    const type = v.get('path.type')
    const art = await Art.getData(id, type)
    if(!art) {
        throw new NotFound() 
    }
    const like = await Favor.userLikeIt(id, type, ctx.auth.uid)

    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: like
    }
})



module.exports = router
