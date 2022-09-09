//!middleware es una accion que se genera entre dos cciones o funciones 

const roleAdminMiddleware = (req, res, next) => {
    const rol = req.user.rol

    if(rol === 'admin'){
        next()
    }else {
        res.status(401).json({satatus: 'error', message: 'You are not autorized'})
    }
}

exports.roleAdminMiddleware = roleAdminMiddleware