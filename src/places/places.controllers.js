const { UUID } = require('sequelize')
const uuid = require('uuid')
const Accommodations = require('../models/accommodations.model')
const Places = require('../models/places.model')

const getAllPlaces = async () => {
    const data = await Places.findAll({

    })
    return data
}

const getPlaceById = async (id) => {
    const data = await Places.findOne({
        where: {
            id : id
        },
        include: [{
            model: Accommodations,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId', 'placeId' ]
            }
        }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}


const createPlace = async (data) => {
    /*const existPlace = await Places.findOne({
        where: {
            city: data.city
        }
    })
    console.log( existPlace)*/

    const newPlace = await Places.create({
        id: uuid.v4(),
        city: data.city,
        state: data.state,
        country: data.country,
        continent: data.continent
    })
    //console.log(newPlace)
    return newPlace
}

const deletePlace = async (id) => {
    const data = await Places.destroy({
        where: {
            id : id
        }
    })
    return data
}

const editPlace = async (placeId, data, userRol) => {
    const { id, ...resOfProperties } = data
    if(userRol === '1b08468b-7b6f-4b3d-bc67-62089ac8706f'){
        const response = await Places.update({
            ...resOfProperties
        }, {where: {
            id : placeId
        }})
        return response
    }else{
        return null
    }
}

module.exports = {
    getAllPlaces,
    getPlaceById,
    createPlace,
    deletePlace,
    editPlace
}