const { response } = require('../app')
const accommodationsControllers = require('./accommodations.controllers')

const getAll = (req, res) => {
    accommodationsControllers.getAllAccommodations()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const getById = (req, res) => {
    const accommodationId = req.params.id
    accommodationsControllers.getAccommodationById(accommodationId)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({err: err, message: 'Invalid ID'})
        })
}

//! falla el servicio para crear un accomodation
const newAccommodation = (req, res) => {
    //const id = req.user.id
    //const data = req.body
    //console.log(data)
    /*accommodationsControllers.createAccommodation(data, id)
        .then(response => {
            res.status(201).json({response: response, message: 'Accommodation created succesfully'})
        })
        .catch(err => {
            res.status(402).json({err: err, message: 'All fields must be completed', filelds: {
                title: "string",
                description: "string",
                guests: int,
                rooms: int,
                beds: int,
                bathrooms: int,
                price: float,
                commision: float,
                placeId: '864ee3c2-facd-4a23-8b4a-4e9d342d9036'
            }})
        })*/
    //res.status(400).json(req)
    //return data    
}

module.exports = {
    getAll,
    getById,
    newAccommodation
}