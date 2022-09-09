//! LOS TEST UNITARIOS TESTEAN SOLO LOS CONTROLADORES
// LA SINTAXIS A USAR ES Assert y TDD (test oriaentado a desarrollo)


const { assert } = require('chai')
const userControllers = require('../users.controller')

describe('test unitario de mis usuarios', () => {
    it('Should return new user when i send correct is correct', (done) => {
        const body = {
                "first_name": "Anayelo",
                "last_name": "Cazarez",
                "email": "anyelocba7@gmail.com",
                "password": "hola",
                "phone": "873873872",
                "birthday_date": "16/03/1994",
                "country": "México",
            }
        
        const data = userControllers.createUser(body)
        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, '')
        done()    //! esta función permite agilizar la ejecucución. 
    })

    it('Should return new user when i send correct is correct', (done) => {
        const body = {
                "first_name": "Anayelo",
                "last_name": "Cazarez",
                "email": "anyelocba7@gmail.com",
                "password": "hola",
                "phone": "873873872",
                "birthday_date": "16/03/1994",
                "country": "México",
                "profile_image": 'asd'
            }
        
        const data = userControllers.createUser(body)
        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)    // que no sean iguales ambos valores
        assert.equal(data.profile_image, 'asd')
        assert.typeOf(data.email, 'string')
        assert.property(data, 'is_active')    // revisa si existe la propiedad 'is_active'
        done()    //! esta función permite agilizar la ejecucución. 
    })

    it('Should return the user when i sent a correct ID', (done) => {
        //const data = userControllers.getUserById('ed025bbb-5fbe-4ddf-9670-e43ce9d80c52')
        const data = userControllers.getUserById(1)

        assert.typeOf(data, 'boolean')
        assert.equal(data, false)

        /*
        assert.isObject(data)
        assert.property(data, 'id')
        assert.property(data, 'email')
        assert.property(data, 'rol')
        assert.property(data, 'first_name')
        assert.property(data, 'last_name')
        assert.equal(data.rol, 'normal')
        assert.property(data, 'is_active')
        assert.equal(data.is_active, true)
        */
        done()
    })

    

})