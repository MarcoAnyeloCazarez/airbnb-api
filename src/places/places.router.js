const router = require('express').Router()
const { route } = require('../app')
const passport = require('passport')
const rolesMiddlewares = require("../../../skeleton-Profe/skeleton-gen14/src/middleware/adminRole")
require('../middlewere/auth.middleware')(passport)

//importo los servicios
const placesServices = require('./places.http')

router.route('/')
    .get(placesServices.getAll)
    .post(placesServices.newPlace)

router.route('/:id')
    .get(placesServices.getById)
    .delete(placesServices.removePlace)
    .put(placesServices.editPlace)

module.exports = {
    router
}