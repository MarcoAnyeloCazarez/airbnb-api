//* Dependencias
const express = require('express')
const passport = require('passport')
const path = require('path')   //esta libreria permite identificar una ruta o auto generarla
require('./middlewere/auth.middleware')(passport)     //esta manera se usa para proeger una ruta, importar passport y a la ruta psarle passport
const initModels = require('./models/initModels')
const defaultData = require('./utils/initialData')

//* Archivos con las rutas
const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router

const {db} = require('./utils/database')

//* Configuraciones iniciales
const app = express()
initModels();   // ejecuta los modelos que tengo en mi archivo initModels



//! Sincronizamos la base de datos
db.authenticate()
    .then(() => console.log('Data base autenticated'))
    .catch(err => console.log(err))

if(process.env.NODE_ENV === 'production'){
    db.sync({force: true})  // el force: true se usa para forzar una sincronización //! Solo para desarrollo
    .then(() => {
        console.log('Database synced'),
        defaultData()
    })
    .catch(err => console.log(err))
}else {
    db.sync({force: true})  // el force: true se usa para forzar una sincronización (borra la información y la vuelve  crear) //! Solo para desarrollo
    .then(() => {
        console.log('Database synced'),
        defaultData()
    })
    .catch(err => console.log(err))
}





app.use(express.json())  //Esta configuración es para habilitar el req.body en el archivo http.js

app.use(express.json())   //!para recibir y manipular información

app.get('/', (req, res) => {     //!peticion a la ruta raiz
    res.status(200).json({message: 'All ok!'})
    console.log(req)
})

app.use('/api/v1/users', userRouter)     // el userRouter es un middlewere, es una funcion que e lleva a cabo dentro de otra
//app.use('/api/v1/users/:id', userRouter)
app.use('/api/v1/auth', authRouter)

app.use('/api/v1/uploads/:imgName', (req, res) => {
    const imgName = req.params.imgName
    res.status(200).sendFile(path.resolve('uploads/') + '/' + imgName)
})


app.listen(8000, () => {
    console.log('server started at port 8000')
})


//exports.default = app
module.exports = app
//exports.app = app