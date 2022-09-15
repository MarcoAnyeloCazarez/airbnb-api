const { UUID } = require('sequelize')
const Accommodations = require('../models/accommodations.model')
const Places = require('../models/places.model')
const Users = require('../models/user.model')

const getAllAccommodations = async () => {
    const data = await Accommodations.findAll({
        include: [{
            model: Places,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        {
            model: Users,
            as: 'user',
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'birthdayDate', 'gender', 'dni']
            }       //! Se le pasa en singular debido a que sequelise llama a cada user, lugar en la tabla por singular
        }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
        }
    })
    return data
}

const getAccommodationById = async (id) => {
    const data = await Accommodations.findOne({
        where: {
            id: id
        },
        include: [{
            model: Places,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }, {
            model: Users,
            as: 'user',
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password', 'birthdayDate', 'gender', 'dni']
            }  
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId' ]
        }
    })
    return data
} 

const createAccommodation = async (data, hostId) => {
    const newAccommodation = await Accommodations.create({
        id: UUID.v4(),
        title: data.title,
        description: data.description,
        guests: data.guests,
        rooms: data.rooms,
        beds: data.beds,
        bathrooms: data.bathrooms,
        price: data.price,
        score: 0.00,
        commision: data.commision,
        placeId: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
        hostId : hostId
      })
    return newAccommodation
}

module.exports = {
    getAccommodationById,
    getAllAccommodations,
    createAccommodation
}