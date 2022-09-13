const { DataTypes } = require('sequelize')
const { db } = require('../utils/database')

const Accommodations = db.define('accommodations', {
   id: {
       primaryKey: true,
       type: DataTypes.UUID,
       allowNull: false
   },

   title: {
    allowNull: false,
    type: DataTypes.STRING
   },

   description: {
    allowNull: false,
    type: DataTypes.STRING
   },

   guests: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
   },

   rooms: {
    allowNull: false,
    type: DataTypes.INTEGER
   },

   beds: {
    allowNull: false,
    type: DataTypes.INTEGER
   },

   bathrooms: {
    allowNull: false,
    type: DataTypes.FLOAT
   },

   price: {
    allowNull: false,
    type: DataTypes.FLOAT
   },

   hostId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: 'userId'
   },

   score: {
    allowNull: false,
    type: DataTypes.FLOAT,
    //validate: {
      //  min: 0,
        //max: 5
    //}
   },

   placeId: {
    allowNull: false,
    type: DataTypes.UUID
   },

   commision: {
    allowNull: false,
    type: DataTypes.FLOAT
   },

   createdAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    //field: 'created_at'
   },

   updatedAt: {
    type: DataTypes.DATEONLY,
    //field: 'updated_at'
   },

   isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
   }
})

module.exports = Accommodations