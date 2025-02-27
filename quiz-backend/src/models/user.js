const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

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
    }
  }
)

module.exports = {
  User
};