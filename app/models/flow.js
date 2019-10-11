const { Sequelize, Model } = require('sequelize')
const { sequelize } = require("../../core/db")
let flow = {
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER

}
// type 100  200  300
class Flow extends Model{

}
Flow.init(flow,{
    sequelize,
    tableName: 'flow'
})


module.exports = {
    Flow
}