//! Para hacer test de todos los controllers

const suma = (a, b) =>  a + b

const test = () => {
    const test1 = suma(4, 6)
    if(test1 === 10){
        return 'Felicidades pasate el test'
    }else {
        return `Ups, tu resultado es ${test1} y se esperaba 10`
    }
}
console.log(test())


//! TEST 2

const { assert } = require("chai")

const sum = (a, b) => {
    const newA = Number(a)
    const newB = Number(b)
    if(newA !== a || newB !== b){
        return 'error'
    }else {
        return a + b
    }
    
}

describe('Test unitario de mis usuarios', () => {
    it('Deberia retornar 8', () => {
        const miFuncionEjecutada = sum(4, 4)
        assert.equal(miFuncionEjecutada, 8, 'Resultado incorrecto, no es 8')
    })

    it('Deberia retornar 10', () => {
        const miFuncionEjecutada = sum(4, 6)
        assert.equal(miFuncionEjecutada, 10, 'Resultado incorrecto, no es 10')
    })

    it('Deberia retornar -8', () => {
        const miFuncionEjecutada = sum(-4, -4)
        assert.equal(miFuncionEjecutada, -8, 'Resultado incorrecto, no es -8')
    })

    it('Deberia retornar error cundo se manda un string', () => {
        const miFuncionEjecutada = sum(4, 'hola')
        assert.equal(miFuncionEjecutada, 'error', 'Hay un valor string')
    })
})