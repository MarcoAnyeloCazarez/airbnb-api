const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const Reservations = db.define('reservations',{
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },

    userId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'user_id'
    },
    
    arrival: {
        allowNull: false,
        type: DataTypes.DATEONLY
    },

    departure: {
        allowNull: false,
        type: DataTypes.DATEONLY
    },

    accomodationId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'accomodation_id'
    },

    adults: {
        allowNull: false,
        type: DataTypes.INTEGER
    },

    kids: {
        allowNull: true,
        type: DataTypes.INTEGER
    },

    babies: {
        allowNull: true,
        type: DataTypes.INTEGER
    },

    pets: {
        allowNull: true,
        type: DataTypes.INTEGER
    },

    score: {
        allowNull: false,
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
            max: 5
        }
    },

    isFinished: {
        type: DataTypes.BOOLEAN,
        field: 'is_finished'
    },

    isCancelled: {
        type: DataTypes.BOOLEAN,
        field: 'is_cancelled'
    },

    comments: {
        allowNull: false,
        type: DataTypes.STRING,
    }
} )

module.exports = Reservations