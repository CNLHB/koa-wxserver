const { Sequelize, Model } = require('sequelize')
const { sequelize } = require("../../core/db")
let base = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pudate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT

}

class Music extends Model{

}
Music.init({...base,url: Sequelize.STRING},{
    sequelize,
    tableName: 'music'
})
class Sentence extends Model{

}
Sentence.init(base,{
    sequelize,
    tableName: 'sentence'
})
class Movie extends Model{

}

Movie.init(base,{
    sequelize,
    tableName: 'movie'
})

module.exports = {
    Movie,
    Sentence,
    Music
}