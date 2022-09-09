const { DataTypes } = require('sequelize')
//const { validate } = require('uuid')
const {db} = require('../utils/database')


//! generando el primer modelo de usuarios
const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allow: null
    },

    firstName: {     //este nombre lo reconoceremos solo para uso de JS
        alloNull: false,
        type: DataTypes.STRING,
        field: 'first_name'      //Con este nombre se guardará en la base de datos
    },

    lastName: {
        alloNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    },

    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        alloNull: false,
        type: DataTypes.STRING(30),
        unique: true,
        validate: {
            isEmail: true
        }
    },
    
    password: {
        alloNull: false,
        type: DataTypes.STRING,
        validate: {
            min: 8
        }
    },

    phone: {
        alloNull: false,
        type: DataTypes.STRING,
        validate: {
            min: 10,
            max: 14
        }
    },

    birthdayDate: {
        alloNull: false,
        type: DataTypes.DATEONLY,
        field: 'birthday_date'
    },

    dni: {
        type: DataTypes.STRING
    },

    /*role: {
        alloNull: false,
        type: DataTypes.UUID
    },*/

    address: {
        type: DataTypes.STRING
    },

    profileImage: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        },
        field: 'profile_image'
    },

    country: {
        alloNull: false,
        type: DataTypes.STRING
    },

    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'active'  //actve, non active, deleted, suspended
    },

    verified: {
        alloNull: false,
        type: DataTypes.BOOLEAN,
        defaultVlue: false
    },

    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at'
    },

    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at'
    }
})

module.exports = Users