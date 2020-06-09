const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
    'alerts',
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        request:{
            type: Sequelize.JSON
        },
        status:{
            type: Sequelize.ENUM('FAILED', 'RECOVERED')
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)