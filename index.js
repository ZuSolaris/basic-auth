'use strict';

const { start, sequelize } = require('./src/server');
const { sequelize } = require('./src/auth/models')


sequelize.sync()
  .then(() => {
    console.log('successful connection');
    start();
  })
  .catch(e => console.error(e));

