const Accommodations = require('../models/accommodations.model')
const Places = require('../models/places.model')

const getAllAccommodations = async () => {
    const data = await Accommodations.findAll({
        include: {
            model: Places
        }
    })
    return data
}

const getAccommodationById = async (id) => {
    const data = await Accommodations.findByPk(id)
    return data
} 