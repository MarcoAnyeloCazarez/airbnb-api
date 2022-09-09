//! los test de itegracion hacen test para las rutas

const chai = require('chai')
const {it , describe } = require('mocha')
const chaiHttp = require('chai-http')

const app = require('../../app')
const { assert } = require('chai')
const userControllers = require('../users.controller')

chai.use(chaiHttp)

describe('suite de test de integracion de usuarios', () => {
    it('should return 200 when i sent a correct ID in params', (done) => {
        chai.request(app)     //chai se usa para testear endpoints o rutas
            .get('/api/v1/users/ed025bbb-5fbe-4ddf-9670-e43ce9d80c52')
            .set('Autorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkMDI1YmJiLTVmYmUtNGRkZi05NjcwLWU0M2NlOWQ4MGM1MiIsImVtYWlsIjoiYW55ZWxvY2JhN0BnbWFpbC5jb20iLCJyb2wiOiJub3JtYWwiLCJpYXQiOjE2NjA4NjkwMjJ9.qvvia7_Nhzbe6E0AUAE5A6AQQLsrz6ux_oxR2Dn6Atw')
            .end((err, res) =>{
                chai.assert.equal(res.status, 200)
                chai.assert.isObject(res.body)
                chai.assert.property(res.body, 'id')
                chai.assert.property(res.body, 'email')
                chai.assert.property(res.body, 'rol')
                chai.assert.equal(res.body.rol, 'normal')
                done()
            })
    })

    //prueba para ruta /me en el verbo delete
    it('Should return 204 when i delete my own user with my credentials', (done) => {
        chai.request(app)
            .delete('/api/v1/users/me')
            .set('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkMDI1YmJiLTVmYmUtNGRkZi05NjcwLWU0M2NlOWQ4MGM1MiIsImVtYWlsIjoiYW55ZWxvY2JhN0BnbWFpbC5jb20iLCJyb2wiOiJub3JtYWwiLCJpYXQiOjE2NjA4NjkwMjJ9.qvvia7_Nhzbe6E0AUAE5A6AQQLsrz6ux_oxR2Dn6Atw')
            .end((err, res) => {
                chai.assert.equal(res.status, 204)
                done()
            })
            
    })

    it('Should return an array with all the users', (done) => {
        chai.request(app)
            .get('/api/v1/users')
            .end((err, res) => {
                chai.assert.isObject(res.body)
                //console.log(res.body)
                //const data = userControllers.getAllUsers()
                //chai.assert.equal(data.email, 'string')
                
                done()
            })
    })
})