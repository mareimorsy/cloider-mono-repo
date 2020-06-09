const Sequelize = require('sequelize')
const config = require('../config')
const db = {}

const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    host: config.db_host,
    dialect: 'mariadb',
    dialectOptions: {connectTimeout: 1000} // mariadb connector option
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db