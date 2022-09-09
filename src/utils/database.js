const { Sequelize } = require('sequelize')  //la variable Sequelize hace referencia a que esta cargada la librería

const db = new Sequelize({
    dialect: 'postgres',     //lo pdemos cambiar por el dialecto que se quiera usar, eje: mysql
    
    //ahora las credenciales para las bases de datos
    host: 'localhost',
    username: 'postgres',
    password: '1602',
    database: 'airbnb',
    port: 5432  //pueto en el que se corre por defecto una base de datos
}) 

module.exports = {
    db
}