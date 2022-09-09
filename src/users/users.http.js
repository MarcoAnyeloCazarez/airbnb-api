//! en este archivo se manejan todas las peticiones, respuestas y los errores

//Imortamos los controladores
const { json, response } = require('express')
const userControllers = require('./users.controller')

const getAll = (req, res) => {
    userControllers.getAllUsers()
        .then((response) => {
            res.status(200).json({items: response.length, users: response})
        })  
}

const getUsersById = (req, res) => {
    const id = req.params.id
    userControllers.getUserById(id)
    /*console.log(id)
    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: `El usuario con ${id} no existe`})    //El usuario no existe
    }
    */
   .then(response => {
        res.status(200).json(response)
   })
   .catch(err => {
        res.status(404).json(`el usuario con ${id} no existe`, err)
   })
}


const registerUser = (req, res) => {   
    const body = req.body      //debenos tener habilitada app.use(express.json()) en el archivo app.js
    if(!body){
        return res.status(400).json({message: 'El body no existe'})
    }
    if(!body.first_name || !body.last_name || !body.email || !body.password || !body.birthday_date || !body.country){
            return res.status(400).json({
                body: {body},
                message: 'All fields must be completed', 
                fields: {
                    first_name: 'string',
                    last_name: 'string',
                    email: 'example@example.com',
                    password: 'password',
                    birthday_date: 'DD/MM/YYYY',
                    country: 'string',
                    phone: '+524435796418'
            } })
        }else{
            userControllers.createUser(body)
                .then((response) => {
                    res.status(201).json({
                        message: `User created succesfully with id: ${response.id}`,
                        user: response
                    })
                })
                .catch(err => {
                    res.status(400).json({message: err, mess: 'The email must be unique'})
                })
            //return res.status(201).json({message: `User created whith id: ${data.id}`})
        }
}

const remove = (req, res) => {
    const id = req.params.id;
    /*const data = userControllers.deleteUser(id);
    if(id){
        return res.status(204).json()
    }else{
        return res.status(400).json({message: 'invalid ID'})
    }*/

    userControllers.deleteUser(id)     //! llamarla de esta manera se generan promesas
        .then((response) => {
            if(response){
            res.status(200).json(response)
            }else{
                res.status(400).json({message: 'Invalid ID'})
            }
        })
}

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body
    if(!Object.keys(data).length){     //Objet.keys(data) genera un arrelo con los nombres de las propiedades que estan dentro del objeto data
        return res.status(400).json({message: 'No llegaron dtos del body'})
    }else if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.phone ||
        !data.rol ||
        !data.profile_imge||
        !data.birthday_date ||
        !data.country ||
        !data.is_active
    ){
        return res.status(400).json({message: "All fields must be completed",
        fields: {
            first_name: "string",
            last_name: "string",
            email: "examle@examle.com",
            password: "string",
            phone: "string",
            rol: "string",
            profile_image: "url",
            birthday_date: "DD/MM/YYYY",
            country: "string",
            is_active: true
        }
    })
    }else{
        const response = userControllers.editUser(id, data)
        return res.status(200).json({
            message: 'User edited succesfully',
            user: response
        })
    }  
}


//! funciones para las rutas protegidas, solo cuando esta log in puede hacer cambios.
const editMyUser = (req, res) => {
    const id = req.user.id
    const data = req.body
    //console.log(data)
    if(!Object.keys(data).length){     //Objet.keys(data) genera un arrelo con los nombres de las propiedades que estan dentro del objeto data
        return res.status(400).json({message: 'No llegaron datos del body'})
    }else if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.profile_img||
        !data.birthday_date ||
        !data.country ||
        !data.is_active
    ){
        return res.status(400).json({message: "All fields must be completed log in",
        fields: {
            first_name: "string",
            last_name: "string",
            email: "examle@examle.com",
            phone: "string",
            profile_image: "url",
            birthday_date: "DD/MM/YYYY",
            country: "string",
            is_active: true
        }
    })
    }else{
        const response = userControllers.editUser(id, data)
        return res.status(200).json({
            message: 'User edited succesfully',
            user: response
        })
    }  
}


const getUser = (req, res) => { 
    const email = req.user.email
    const data = userControllers.getUserByEmail(email)
    //console.log(id)
    if(data){
        return res.status(200).json(data)
    }else{
        return res.status(404).json({message: `El usuario con ${email} no existe`})    //El usuario no existe
    }

}

const removeUser = (req, res) => {
    const id = req.user.id
    const data = userControllers.deleteUser(id);
    if(id){
        return res.status(204).json({message: 'DELETED'})
    }else{
        return res.status(400).json({message: 'invalid ID'})
    }
}


const postProfileImg = (req, res) => {
    const userId = req.user.id
    const imgPath = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename

    const data = userControllers.editProfileImg(userId, imgPath)
    return res.status(200).json(data)

}


module.exports = {
    getAll,
    getUsersById,
    registerUser,
    remove,
    edit,
    editMyUser,
    getUser,
    removeUser,
    postProfileImg
}