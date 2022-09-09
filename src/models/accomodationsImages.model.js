const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const AccomodationsImages = db.define('accomodations_images', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID
    },

    name: {
        allowNull: false,
        type: DataTypes.STRING
    },

    accomodationsId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'accomodations_id'
    },

    url: {
        allowNull: false,
        type: DataTypes.STRING
    }
})

module.exports = AccomodationsImages