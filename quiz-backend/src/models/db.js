const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/development.sqlite'
});

sequelize.authenticate()
    .then(() => { console.log('Conexion hecha!') })
    .catch((error) => { console.error('Error al conectar db ', error) })

module.exports = {
    sequelize
};