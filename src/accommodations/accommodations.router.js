const router = require('express').Router()
const accommodationsServices = require('./accommodations.http')

router.route('/')
    .get(accommodationsServices.getAll)

module.exports = {
    router
}