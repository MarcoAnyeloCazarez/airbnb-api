const Accomodations = require('../models/accommodations.model')
const AccomodationsImages = require('../models/accomodationsImages.model')
const Places = require('../models/places.model')
const Reservations = require('../models/reservations.model')
const Roles = require('../models/roles.model')  
const Users = require('../models/user.model')
const UsersImages = require('../models/usersImages.model')
const Accommodations = require('../models/accommodations.model')

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
        email: "anyelocaba7@gmail.com",
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

    await Places.bulkCreate([
        {
          id: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
          city: 'Guadalajara',
          state: 'Jalisco',
          country: 'México',
          continent: 'America'
        },
        {
          id: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
          city: 'Zapopan',
          state: 'Jalisco',
          country: 'México',
          continent: 'America'
        },
        {
          id: '3436a556-6623-40ba-88b8-2e01009f9d82',
          city: 'Suba',
          state: 'Bogotá',
          country: 'Colombia',
          continent: 'America'
        },
        {
          id: '134a55b6-487c-46cc-a5b5-9392af20c205',
          city: 'Medellín',
          state: 'Antioquia',
          country: 'Colombia',
          continent: 'America'
        },
        {
          id: '3a230417-80ae-4232-a8ff-6fd50068a777',
          city: 'Azcapotzalco',
          state: 'CDMX',
          country: 'México',
          continent: 'America'
        },
        {
          id: '0d907427-7623-4ec9-8c6d-270bb92fbbe7',
          city: 'Monterrey',
          state: 'Muevo León',
          country: 'México',
          continent: 'America'
        }
    ])

    await Accommodations.create({
      id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
      title: "premium - vistas 360 ciudad (alberca y gym)",
      description: "Acerca del espacio. Este impresionante departamento",
      guests: 6,
      rooms: 3,
      beds: 3,
      bathrooms: 4.5,
      price: 1536.00,
      score: 0.00,
      commision: 150.00,
      placeId: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
      hostId : 'ed025bbb-5fbe-4ddf-9670-e43ce9d80c52'
    })
}


module.exports = generateInitialData