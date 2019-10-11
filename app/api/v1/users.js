const router = require('koa-router')()
const { RegisterValidator, TokenrValidator } = require('../../validator/validator')
const { User } = require("../../models/user")
const { LoginType } = require('../../lib/enum')
router.prefix('/v1/user')

router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    const r = await User.create(user)
    ctx.body = {
        code: 200,
        msg: '注册成功',
        data: {
            email: r.email,
            nickname: r.nickname,
            id: r.id
        }

    }
})

router.post('/login', async (ctx, next) => {
    const v = await new TokenrValidator().validate(ctx)
    switch (parseInt(v.get("body.type"))) {
        case LoginType.USER_EMAIL:
            break;
        case USER_MINI_PROGRAM :

            break;
        default:
            break;
    }


    ctx.body = v 
})

module.exports = router
