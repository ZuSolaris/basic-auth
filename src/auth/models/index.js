'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users-model');

const DATABASE_URL = 'sqlite::memory';
const sequelize = new Sequelize(DATABASE_URL);
const Users = userSchema(sequelize, DataTypes);


module.exports = {
  sequelize,
  Users,
};
