const router = require('express').Router()
const passport = require('passport')
const rolesMiddlewares = require("../../../skeleton-Profe/skeleton-gen14/src/middleware/adminRole")
require('../middlewere/auth.middleware')(passport)
const { route } = require('../app')
const accommodationsServices = require('./accommodations.http')

router.route('/')
    .get(accommodationsServices.getAll)
    .post(passport.authenticate('jwt', {session: false}),accommodationsServices.newAccommodation)

router.route('/:id')
    .get(accommodationsServices.getById)

module.exports = {
    router
}