const { UUID } = require('sequelize')
const { DataTypes } = require('sequelize')

const { db } = require('../utils/database')

const Roles = db.define('roles', {         //(nombreDeLaTabla, {valores que exixstiran en la tabla})
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Roles