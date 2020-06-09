const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'monitors',
    {
        id:{
            type: Sequelize.TEXT,
            primaryKey: true,
            // autoIncrement: true
        },
        request:{
            type: Sequelize.JSON
        },
        occurrence:{
            type: Sequelize.NUMBER
        },
        success_threshold: {
            type: Sequelize.NUMBER
        },
        failed_threshold: {
            type: Sequelize.NUMBER
        },
    },
    {
        timestamps: false
    }
)