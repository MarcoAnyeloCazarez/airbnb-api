//!  En este archivo se usan los vervos y los servicios que cada uno usará, se hara referencia a las funciones del archivo http.js

const router = require("express").Router()
const passport = require('passport')
const rolesMiddlewares = require("../middlewere/adminRole")
require('../middlewere/auth.middleware')(passport)
//const multer = require('multer')
const { upload } = require('../utils/multer')

const usersServices = require('./users.http')


/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload =  multer({storage})
*/

router.route('/') //  /api/v1/users
    .get(usersServices.getAll)
    .post(usersServices.registerUser)


    //! en esta ruta manejamos multer mara manejar archivos
/*router.post('/upload', upload.single('profile_image'), (req, res) => {     //upload carga os middlewarea de multer
   req.status(200).json(req.file)
})*/


router.route('/me')
    .put(passport.authenticate('jwt',{session: false}),usersServices.editMyUser)      //! De esta anera se protege la rura, solo se puede entrar si se generó algun token
    .get(passport.authenticate('jwt',{session: false}),usersServices.getUser)
    .delete(passport.authenticate('jwt',{session: false}),usersServices.removeUser)

router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session: false}),upload.single('profile_img'), usersServices.postProfileImg)
 
router.route('/:id')
    .get(passport.authenticate('jwt',{session: false}), rolesMiddlewares.roleAdminMiddleware, usersServices.getUsersById)
    .delete(passport.authenticate('jwt', {session: false}), rolesMiddlewares.roleAdminMiddleware ,usersServices.remove)
    .put(passport.authenticate('jwt',{session: false}), rolesMiddlewares.roleAdminMiddleware, usersServices.edit)

router.route('/:id/role')
    .get(usersServices.getUserRole)


exports.router = router

