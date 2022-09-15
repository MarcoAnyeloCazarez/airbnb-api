const { Sequelize } = require('sequelize')  //la variable Sequelize hace referencia a que esta cargada la librería
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const db = new Sequelize({
    dialect: 'postgres',     //lo pdemos cambiar por el dialecto que se quiera usar, eje: mysql
    
    //ahora las credenciales para las bases de datos
   /* host: 'localhost',
    username: 'postgres',
    password: '1602',
    database: 'airbnb',
    port: 5432 */ //pueto en el que se corre por defecto una base de datos

    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    logging: false,
    dialectOptions:
        process.env.NODE_ENV === 'production'
        ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
            },
        }
        : {},
}) 

module.exports = {
    db
}