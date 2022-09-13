const Accomodations = require('../models/accomodations.model')
const AccomodationsImages = require('../models/accomodationsImages.model')
const Places = require('../models/places.model')
const Reservations = require('../models/reservations.model')
const Roles = require('../models/roles.model')  
const Users = require('../models/user.model')
const UsersImages = require('../models/usersImages.model')

const generateInitialData = async() => {
    await Roles.bulkCreate([     //Creamos los roles dentro de la tabla de roles una vez que ya está creada
        {name: "gest", id: "234d4031-2f5e-4a16-a24f-319afd7f7835"}, 
        {name: "host", id: "b3719454-3505-4515-950f-15ca48daaa6d"}, 
        {name: "admin", id: "1b08468b-7b6f-4b3d-bc67-62089ac8706f"}
    ], {validate: true})
//
    await Users.create({
        id: "ed025bbb-5fbe-4ddf-9670-e43ce9d80c52",
        firstName: "Anyelo",
        lastName: "Cazarez",
        email: "anyelocba7@gmail.com",
        gender: "male",
        password: "$2b$10$J8MM4kUcqvaSIxoOmUobHeVttKsjhLCgyjDQ3kPNuq9CCc7O/WeP2",
        phone: "123456789",
        birthdayDate: "1994/03/02",
        dni:"dni",
        roleId: "1b08468b-7b6f-4b3d-bc67-62089ac8706f",
        address: "hola",
        profileImage: "uno.com",
        status: "active",
        verified: false
    })
}


module.exports = generateInitialData