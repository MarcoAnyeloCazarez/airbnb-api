const { response, json } = require('../app')
const placesControllers = require('./places.controllers')

const getAll = (req, res) => {
    placesControllers.getAllPlaces()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}  

const getById = (req, res) => {
    const id = req.params.id
    console.log(id)
    placesControllers.getPlaceById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(response)
        })
}

const newPlace = (req, res) => {
    const data = req.body
    if(!data.city || !data.state || !data.country || !data.continent){
        res.status(400).json({message: 'All the fiels must be completed', fields: {
            city: "string",
            state: "string",
            country: "string",
            continent: "string"
        }})
    }else{
        placesControllers.createPlace(data)
        .then((response) => {
            res.status(201).json({
                //message: 'Place created succesfully', 
                user: response
            })
        })
        .catch(err => {
           res.status(400).json(err)
        })
    }
}

const removePlace = (req, res) => {
    const id = req.params.id
    placesControllers.deletePlace(id)
        .then((response) => {
            res.status(200).json({response: response, message: 'Place deleted'})
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

const editPlace = (req, res) => {
    const placeId = req.params.id
    const newData = req.body
    //const userRol = req.user.id

    if(!newData.city || 
        !newData.state || 
        !newData.country || 
        !newData.continent){
            return res.status(400).json({message: 'All fields must be completed', fields: {
                city: 'string',
                state: 'string', 
                country: 'string',
                continent: 'string'
            }})
        }else {
            const response = placesControllers.editPlace(placeId, newData, '1b08468b-7b6f-4b3d-bc67-62089ac8706f')   //no me esta cargand el id del user debido a que no lo he modificado paa que lo cargue de la base de datos
            return res.status(200).json({message: 'Place edited succesfully',
            user: response
        })
        }

    
}

module.exports = {
    getAll,
    getById,
    newPlace,
    removePlace,
    editPlace
}