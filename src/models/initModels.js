const Accomodations = require('./accomodations.model')
const AccomodationsImages = require('./accomodationsImages.model')
const Places = require('./places.model')
const Reservations = require('./reservations.model')
const Roles = require('./roles.model')
const Users = require('./user.model')
const UsersImages = require('./usersImages.model')



//! creamos las relaciones entre los modelos
const initModels = () => {
    //fk             //pk
    Roles.hasMany(Users) //{ foreignKey: { name: "role_id", allowNull: false } })    //! belongs indica donde esta la llave primaria
    Users.belongsTo(Roles)        //métodos posibles: belongsTo, belongsToMany, hasOne, hasMany         //! hasOne indica donde esta la llave foránea
   

    Users.hasMany(UsersImages)
    UsersImages.belongsTo(Users)

    Users.belongsToMany(Accomodations, { through: Reservations })       //relacion de muchos a muchos, Reservations es la tabla terciaria que une a Users y Acomodations
    Accomodations.belongsToMany(Users, { through: Reservations })

    Places.hasMany(Accomodations)
    Accomodations.belongsTo(Places)

    Accomodations.hasMany(AccomodationsImages)
    AccomodationsImages.belongsTo(Accomodations)

    Users.hasMany(Accomodations)
    Accomodations.belongsTo(Users)
}

module.exports = initModels