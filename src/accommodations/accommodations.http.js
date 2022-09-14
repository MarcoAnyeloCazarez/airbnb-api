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

module.exports = {
    getAll
}