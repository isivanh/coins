const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/development.sqlite'
});
sequelize.authenticate()
  .then(() => { console.log('Conexion hecha!') })
  .catch((error) => { console.error('Error al conectar db ', error) })

const User = sequelize.define(
  'User',
  {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    coins: {
      defaultValue: 1000,
      type: DataTypes.INTEGER
    },
  })

module.exports = {
  User,
  sequelize
};