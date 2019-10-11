const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require("../models/user")
const { LoginType } = require('../lib/enum')
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule("isInt", "需要是正整数", { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule("isEmail", '不符合Email规范')
        ]
        this.password1 = [
            new Rule('isLength', '密码至少6个字符，最多18个字符', {
                min: 6,
                max: 18
            })
            // ,
            // new Rule(
            //     'matches',
            //     '密码长度必须在6~22位之间，包含字符、数字和 _ ',
            //     '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
            // )
        ]
        this.password2 = this.password2
        this.nickname = [
            new Rule('isLength', '昵称不符合规范', {
                min: 2,
                max: 18
            })
        ]
    }
    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error("两次密码必须相同")
        }
    }
    async validateEmail(vals) {
        const email = vals.body.email;
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (user) {
            throw new Error('email已存在')
        }
    }
}
class TokenrValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule("isLength", "不符合账号规则", { min: 4, max: 32 })
        ]
        this.secret = [
            new Rule("isOptional"),
            new Rule("isLength", "至少6个字符", { min: 6, max: 128 })
        ]

    }
    validateLoginType(vals) {
        if(!vals.body.type){
            throw new Error("type是必须参数")
        }
        if(!LoginType.isThisType(vals.body.type)){
            throw new Error("type参数不合法")
        }
    }
}

class NotEmptyValidator extends LinValidator{
    constructor() {
        super()
        this.token = [
            new Rule("isLength", '不允许为空', {min: 1})
        ]
    }
}
function checkType(vals) {
    if(!vals.body.type) {
        throw new Error("type参数不合法")
    }
    if(!LoginType.isThisType(vals.body.type)) {
        throw new Error('type参数不合法')
    }
}

class LikeValidator extends PositiveIntegerValidator{
    constructor() {
        super()
        this.validateType = checkType
    }
}
class ClassicValidtor extends LikeValidator{

}
module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenrValidator,
    NotEmptyValidator,
    LikeValidator,
    ClassicValidtor
}