const { UUID, Model } = require('sequelize')
const Reservations = require("../models/reservations.model")



const updateReservation = async (data, reservationId) => {
    const {id, ...restOfData} = data

    const response = await Reservations.update(restOfData, {
        where: {
            id: reservationId
        }
    })
    return response
}

module.exports = {
    updateReservation
}