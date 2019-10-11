const { Sequelize, Model } = require('sequelize')
const { sequelize } = require("../../core/db")
const { LikeError, DisLikeError } = require("../../core/http-exception")
const { Art } = require('./art')
class Favor extends Model {
    static async like(art_id, type, uid) {
        //1 添加记录
        //2 汇总数量
        const finder = {
            art_id,
            type,
            uid
        }
        const favor = await Favor.findOne({
            where: finder
        })
        if (favor) {
            throw new LikeError()
        }
        //数据库事务
       return sequelize.transaction(async t => {
            await Favor.create(
                finder
            , { transaction: t })
           const art = await Art.getData(art_id, type)
           await art.increment('fav_nums', { by: 1, transaction: t })
        })
    }
    static async disLike(art_id, type, uid) {
        //1 添加记录
        //2 汇总数量
        const finder = {
            art_id,
            type,
            uid
        }
        const favor = await Favor.findOne({
            where: finder
        })
        if (!favor) {
            throw new DisLikeError("无点赞记录")
        }
        //数据库事务
       return sequelize.transaction(async t => {
            await favor.destroy({
                force: false,
                transaction: t
            })
           const art = await Art.getData(art_id, type)
           await art.decrement('fav_nums', { by: 1, transaction: t })
        })
    }
    static async userLikeIt() {

    }
}
Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
}
)
module.exports = {
    Favor
}