const { comparePassword } = require("../utils/crypt")
const { getUserByEmail } = require("../users/users.controller")

const loginUser = async (email, password) => {
    try {
        const user = await (getUserByEmail(email))
        const verify_password = comparePassword(password, user.password)
        if (verify_password){
            return user
        }
        return false
    } catch (err) {
        return false
    }



    //const user = getUserByEmail(email)
  
    //? user.password
    //* password
   /* if(user){
        const verify_password = comparePassword(password, user.password)    
        if(verify_password){
            return user
        }
    }
    return false*/

    /*return await getUserByEmail(email)
        .then((user) => {
            const verify_password = comparePassword(password, user.password)    
            if(verify_password){
                return user
            }
            return false
        })
        .catch(() => false)*/
    
       
    
}

module.exports = {
    loginUser
}