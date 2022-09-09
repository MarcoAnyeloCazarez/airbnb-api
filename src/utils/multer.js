//! Este es el archivo de configuracion o middleware para guardar rchivos en mi proyecto
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {      //destino para ser guardado el archivo
        cb(null, path.resolve('uploads/') )
    },
    filename: (req, file, cb ) => {
        cb(null, Date.now() + '-' + file.originalname)   //se le da el nombre al archivo
    }
})

const upload = multer({storage})
exports.upload = upload