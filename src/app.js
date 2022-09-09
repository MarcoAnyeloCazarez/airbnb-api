//* Dependencias
const express = require('express')
const passport = require('passport')
//const multer = require('multer')
const path = require('path')   //esta libreria permite identificar una ruta o auto generarla
require('./middlewere/auth.middleware')(passport)     //esta manera se usa para proeger una ruta, importar passport y a la ruta psarle passport
const initModels = require('./models/initModels')

//* Archivos de rutas
const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router

const {db} = require('./utils/database')

//* Configuraciones iniciales
const app = express()
initModels();   // ejecuta los modelos que tengo en mi archivo initModels


//! ejemplo para uso de la libreria multer (almacenamiento de archivos)
/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})*/
//const upload = multer({dest: 'uploads/'})    //crea la carpeta donde se guradarn los archivos, en este caso uploads
//const upload = multer({storage: storage})



//! Sincronizamos la base de datos
db.authenticate()
    .then(() => console.log('Data base autenticated'))
    .catch(err => console.log(err))


db.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err))






app.use(express.json())  //Esta configuración es para habilitar el req.body en el archivo http.js

app.use(express.json())   //!para recibir y manipular información

app.get('/', (req, res) => {     //!peticion a la ruta raiz
    res.status(200).json({message: 'All ok!'})
    console.log(req)
    
})

//app.post('/upload', upload.single('image'), (req, res) => {         //ejemplo para uso de multer, me genera una carpeta uploads y en ella guarda la imagen. s
  //  res.status(200).json({
    //    message: 'Image uploades succesfully'
            //path.resolve('uploads/')  //genera la ruta completa del archivo. Se coloca un / al final del nombre de la carpeta en la que se guardará ára indicar que el lugar donde se almacenará será una carpeta
            //! multer crea un objeto en req que se llama file (req.file)
      //  })
//})

app.use('/api/v1/users', userRouter)     // el userRouter es un middlewere, es una funcion que e lleva a cabo dentro de otra
//app.use('/api/v1/users/:id', userRouter)
app.use('/api/v1/auth', authRouter)

app.use('/api/v1/uploads/:imgName', (req, res) => {
    const imgName = req.params.imgName
    res.status(200).sendFile(path.resolve('uploads/') + '/' + imgName)
})

// passport.authenticate('jwt', {session: false}), 
    //(req, res) => {
    //res
        //.status(200)
        //.json({message: 'tienes credenciales corriendo', email: req.user.email})  //passport en request nos da un objeto que se llama user, y podemos ya entrar a las propiedades
//})

app.listen(8000, () => {
    console.log('server started at port 8000')
})


//exports.default = app
module.exports = app
//exports.app = app