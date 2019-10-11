const util = require('util')
const axios = require('axios')
const { wx } = require('../../config/config')
const { AuthFailed } = require('../../core/http-exception')
const {generateToken} = require("../../core/util")
const {Auth} = require("../../middlewares/auth")
const { User } = require("../models/user")
class WXManager{
    static async codeToToken(code) {
        const url= util.format(wx.loginUrl, wx.appId, wx.appSecret, code) 
        const result = await axios.get(url)
        if(result.status !== 200){
            throw new AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        if(errcode) {
            throw new AuthFailed('openid获取失败' + errcode)
        }
        let  user = await User.getUserByOpenid(result.data.openid)
        if(!user) {
            user = await User.registerByOpenind(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}
module.exports = {
    WXManager
}