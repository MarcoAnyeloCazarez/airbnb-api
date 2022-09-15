const uuid = require('uuid')
const { hashPassword } = require('../utils/crypt')   //! importamos las funciones para encriptar y desencriptar, hechas en el archivo crypts

const Users = require('../models/user.model')
const passport = require('passport')
const { password } = require('pg/lib/defaults')
const Roles = require('../models/roles.model')

const userDB = [{
    
    "id": "ed025bbb-5fbe-4ddf-9670-e43ce9d80c52",
    "firsName": "Anayelo",
    "lastName": "Cazarez",
    "email": "anyelocba7@gmail.com",
    "gender": "",
    "password": "$2b$10$J8MM4kUcqvaSIxoOmUobHeVttKsjhLCgyjDQ3kPNuq9CCc7O/WeP2",
    "phone": "123456789",
    "birthdayDate": "16/03/1994",
    "role": "1b08468b-7b6f-4b3d-bc67-62089ac8706f",
    "profileImage": "",
    "address": "",
    "dni":"",
    "status": "active",
    "verified": false
    
}]

const getAllUsers = async () => {  

    const data = await Users.findAll({
        attributes: {
            exclude: ['password', 'email']    //método para excluir información y no se muestren al momento de mostrar el usuario
        }
    })
    return data
}

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: {
            id: id,
            is_active: true
        },
        attributes: {
            exclude: ['password']
            //include:[name]  
        }
     })
     return data
}

const createUser = async (data) => {
     const newUser = await Users.create({
        id: uuid.v4(),            
        firstName: data.firstName,     
        lastName: data.lastName,
        gender: data.gender,      
        email: data.email,         
        password: hashPassword(data.password),       
        phone: data.phone,          
        birthdayDate: data.birthdayDate,
        dni: data.dni,  
        address: data.address,            
        profileImage: data.profileImage,
        role_id: '234d4031-2f5e-4a16-a24f-319afd7f7835',
        status: 'active', 
        verified: false
    });
    return newUser
}

//createUser({password: 'root'})

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id : id
        }
    }) 
    return data
}


// en este edit  el admin puede modificar usuarios
const editUser = async (userId, data ,userRol) => {    
    const {password, id, verified, role_id, ...restOfProperties} = data   //! las variables previas al split operatos ...restOfProperties no las cargará en el sigioente objeto
    if(userRol === '1b08468b-7b6f-4b3d-bc67-62089ac8706f'){
        const response = await Users.update({...restOfProperties, role_id}, {where: {id: userId}})
        return response
    }else {
        const {password, id, verified, role, ...restOfProperties} = data   //! las variables previas al split operatos ...restOfProperties no las cargará en el sigioente objeto
        const response = await Users.update({...restOfProperties}, {where: {id: userId}})
        return response
    } 
} 

const getUserByEmail = async (email) => {
    /*const data = userDB.filter((item) => item.email === email);
    return data.length ? data[0] : false*/
    //? select * from users where email = ${email};
    const data = await Users.findOne({
        where: { email},
        attributes: {
            exclude: ['createdT', 'updatedAt' ] 
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


const getUserWithRole = async (userId) => {
    const data = await Users.findAll({
        where: {
            id: userId
        },
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "roleId"]
        },
        include: [     //haciendo un join con información de otra tabla en este caso la de roles
            {
                model: Roles,
                as: "role",
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt']
                }
            }
        ]
    })
    return data
}

module.exports = {
    getAllUsers,
    editUser,
    getUserById,
    deleteUser,
    createUser,
    getUserByEmail,
    editProfileImg,
    getUserWithRole
}


