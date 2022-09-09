const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const Places = db.define('places', {
    id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true
    },

    city: {
        allowNull: false,
        type: DataTypes.STRING
    },

    state: {
        allowNull: false,
        type: DataTypes.STRING
    },

    country: {
        allowNull: false,
        type: DataTypes.STRING
    },

    continent: {
        allowNull: false,
        type: DataTypes.STRING
    },

    createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'created_at'
    },

    updatedAt: {
        type: DataTypes.DATEONLY,
        field: 'updated_at'
    }
})

module.exports = Places