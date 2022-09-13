//!middleware es una accion que se genera entre dos cciones o funciones 
const Role = require('../models/roles.model')

const roleAdminMiddleware = (req, res, next) => {
    Role.findOne({
        where: {
            name: 'admin'
        }
    }).then ((response) => {
        const rol = req.user.id    //obtenemos el id del TOKEN
        console.log(`el rol del user loggeado es: ${rol}`)
        console.log(`el user obtenido de db es: ${response.id}`)
        if(rol === response.id){
            next()
        }else{
            res.status(401).json({
                status: 'error', 
                message: 'You are not autorized'})
        }
    }).catch(() => res.status(401).json({
        status: 'error', 
        message: 'You are not autorized'
    }))
}




const roleHostMiddleware = (req, res, next) => {
    Role.findOne({
        where: {
            name: 'host'
        }
    }).then ((response) => {
        const rol = req.user.id    //obtenemos el id del TOKEN

        if(rol === response.id){
            next()
        }else{
            res.status(401).json({
                status: 'error', 
                message: 'You are not autorized'})
        }
    }).catch(() => res.status(401).json({
        status: 'error', 
        message: 'You are not autorized'
    }))
}

module.exports = { 
    roleAdminMiddleware,
    roleHostMiddleware
}