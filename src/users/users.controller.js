const uuid = require('uuid')
const { hashPassword, comparePassword } = require('../utils/crypt')   //! importamos las funciones para encriptar y desencriptar, hechas en el archivo crypts

const Users = require('../models/user.model')
const passport = require('passport')
const { password } = require('pg/lib/defaults')

const userDB = [{
    
    "id": "ed025bbb-5fbe-4ddf-9670-e43ce9d80c52",
    "first_name": "Anayelo",
    "last_name": "Cazarez",
    "email": "anyelocba7@gmail.com",
    "password": "$2b$10$J8MM4kUcqvaSIxoOmUobHeVttKsjhLCgyjDQ3kPNuq9CCc7O/WeP2",
    "phone": "",
    "birthday_date": "16/03/1994",
    "rol": "normal",
    "profile_image": "",
    "country": "México",
    "is_active": true,
    "verified": false
    
}]

const getAllUsers = async () => {  

    const data = await Users.findAll({
        attributes: {
            exclude: ['password', 'email']    //método para excluir información y no se muestren al momento de mostrar el usuario
        }
    })
    return data

    //return userDB       //! Siempre se rrtotna algo en las funciones para poder contolar los errores
    //? COMANDO SQL EQUIVALENTE: select * from users;
}

const getUserById = async (id) => {
    //const data = userDB.filter(item => item.id === id)   //! me regresa un arreglo con el id que coincida con el de la peticion
    /*if (data.length > 0){
        return data[0]
    }else {
        return null
    }*/

    //return data.length ? data[0] : false
    //? COMANDO SQL EQUIVALENTE: select * from users where id = ${id};

    const data = await Users.findOne({
        where: {
            id: id,
            is_active: true
        },
        attributes: {
            exclude: [password]
            //include:[name]  
        }
     })
     return data
}

const createUser = async (data) => {
   /* const newUser = {
        id: uuid.v4(),             //Oblligatorio y único      //!  uuid crea un identificador único 
        first_name: data.first_name,     //Oblligatorio
        last_name: data.last_name,      //Oblligatorio
        email: data.email,          //Obligatorio y único
        password: hashPassword(data.password),       //Oblligatorio    //! Corremos la función para encriptar la contraseña y le pasamos la contrasela a encriptar 
        phone: data.phone ? data.phone : '',          //Único       //! usamos operador ternario (?), es como in if
        birthday_date: data.birthday_date,  //Oblligatorio
        rol: 'normal',            //Oblligatorio y por defecto "normal"
        profile_image: data.profile_image ? data.profile_image : '',
        country: data.country,        //Obligatorio
        is_active: true,    //Oblligatorio y por defecto true
        verified: false
    }*/
    //userDB.push(newUser)
    //return(newUser)

    const newUser = await Users.create({
        id: uuid.v4(),            
        firstName: data.first_name,     
        lastName: data.last_name,     
        email: data.email,          
        password: hashPassword(data.password),       
        phone: data.phone,          
        birthdayDate: data.birthday_date,  
        role: uuid,            
        profileImage: data.profile_image,
        country: data.country,
        status: 'active', 
        verified: false
    })
    return newUser
}

//createUser({password: 'root'})

const deleteUser = async (id) => {
    /*const index = userDB.findIndex(user => user.id === id)
    if (index !== -1){
        userDB.splice(index, 1)
    }else {
        return false
    }*/
    
    const data = await Users.destroy({
        where: {
            id : id
        }
    }) 
    return data
}

const editUser = async (userId, data ,userRol) => {
    /*const index = userDB.findIndex(user => user.id === id)
    if(index !== -1){
        userDB[index] = {
            id: id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: userDB[index].password,
            phone: data.phone ? data.phone : '',
            birthday_date: data.birthday_date,
            role: data.rol,
            profile_image: data.profile_image,
            country: data.country,
            is_active: data.is_active,
            verified: false
        }
        return userDB[index]
    }else{
        createUser(data)
    }*/
    
    if(userRol === 'admin'){
        const {password, id, verified, ...restOfProperties} = data   //! las variables previas al split operatos ...restOfProperties no las cargará en el sigioente objeto
        const response = await Users.update({
            ...restOfProperties
        }, {
            where: {
                id: userId
            }
        })
        return response
    }else {
        const {password, id, verified, role, ...restOfProperties} = data   //! las variables previas al split operatos ...restOfProperties no las cargará en el sigioente objeto
        const response = await Users.update({
            ...restOfProperties
        }, {
            where: {
                id: userId
            }
        })
        return response
    }
    
} 

const getUserByEmail = async (email) => {
    /*const data = userDB.filter((item) => item.email === email);
    return data.length ? data[0] : false*/
    //? select * from users where email = ${email};
    const data = await Users.findOne({
        where: {
            email: email,
            is_active: true
        },
        attributes: {
            exclude: [password]
            //include:[name]  
        }
     })
     return data
}


const editProfileImg = async (userID, imgUrl) => {
    /*const index = userDB.findIndex(user => user.id === userID)
    if(index !== -1){
        userDB[index].profile_image = imgUrl
        return userDB[index]
    }else {
        return false
    } */
    
    const response = await Users.update({
            profile_image: imgUrl
        }, {
            where: {
                id: userID
            }
        })
        return response
}

module.exports = {
    getAllUsers,
    editUser,
    getUserById,
    deleteUser,
    createUser,
    getUserByEmail,
    editProfileImg
}


