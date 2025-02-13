const { Sequelize } = require('sequelize');
const config = require("../config");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `./db/${config.env}.sqlite`
});

sequelize.authenticate()
    .then(() => { console.log('Connected to DB') })
    .catch((error) => { console.error('Error when connecting to DB ', error) })

module.exports = {
    sequelize
};