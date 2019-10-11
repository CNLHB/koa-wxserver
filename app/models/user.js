const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const { sequelize } = require("../../core/db")
const {  AuthFailed } = require("../../core/http-exception")


class User extends Model {
    static async verfyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if(!user){
            throw new AuthFailed("账号不存在");
        }
        console.log(plainPassword)
        let password = user.password
        const correct = bcrypt.compareSync(plainPassword, password)
        if(!correct){
            throw new AuthFailed("密码不正确")
        }
        return user
    }
    static async getUserByOpenid(openid){
        const user = await User.findOne({
            where:{
                openid
            }
        })
        return user
    }
    static async registerByOpenind(openid){
        const user = await User.create({
                openid
        })
        return user
    }
}

User.init({
    //主键
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10);
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue("password", psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: "user"
})

module.exports = { User }