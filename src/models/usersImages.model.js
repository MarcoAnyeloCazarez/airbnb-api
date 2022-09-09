const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const UsersImages = db.define('users_images', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID
    },

    url: {
        type: DataTypes.STRING
    },

    userId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'user_id'
    }
})

module.exports = UsersImages