'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const basicAuth = require('./auth/middleware/basic');
const { Users } = require('./auth/models/');
const authRouter = require('./auth/rout');
const router = require('./auth/router/router');

// NOTE: connected to sqlite::memory out of box for proof of life
// TODO: 
// connect postgres for local dev environment and prod
// handle SSL requirements
// connect with sqlite::memory for testing
const DATABASE_URL = 'sqlite:memory'

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

const sequelize = new Sequelize(DATABASE_URL);

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

// Create a Sequelize model
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});


// make sure our tables are created, start up the HTTP server.

module.exports = {
  start: () => app.listen(3000, () => console.log('server up')),
  sequelize,
  Users,

}
