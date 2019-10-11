const router = require('koa-router')()
const { TokenrValidator, NotEmptyValidator } = require('../../validator/validator')
const { ParameterException } = require("../../../core/http-exception")
const { User } = require("../../models/user")
const { LoginType } = require('../../lib/enum')
const { generateToken } = require('../../../core/util')
const { WXManager } = require("../../services/wx")
const { Auth } = require("../../../middlewares/auth")

router.prefix('/v1/token')

router.post('/', async (ctx, next) => {
    const v = await new TokenrValidator().validate(ctx)
    let token;
    switch (parseInt(v.get("body.type"))) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get("body.account"), v.get("body.secret"))
            break;
        case  LoginType.USER_MINI_PROGRAM :
            token = await WXManager.codeToToken(v.get('body.account'))
            break;
        case  LoginType.USER_MINI_PROGRAM :
            throw new ParameterException("参数错误")
        default:
            throw new ParameterException("参数错误")
    }
    ctx.body = {
        token
    }
})
router.post('/verify', async (ctx, next) => {
    const v = await new NotEmptyValidator().validate(ctx)
    const result = Auth.veriftyToken(v.get('body.token'))
    ctx.body = {
        result
    }
})

async function emailLogin(account, secret) {
    console.log(secret)
    const user = await User.verfyEmailPassword(account, secret)
    return token = generateToken(user.id, 8)
}


module.exports = router
