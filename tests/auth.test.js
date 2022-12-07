'use strict';

const { app } = require('../src/server');

const { sequelize } = require('../src/auth/models');
const supertest = require('supertest');
const { describe } = require('yargs');
const { exportAllDeclaration } = require('@babel/types');
const request = supertest(app);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

describe('Auth Test', () => {
  test('allows user to sign up with a POST to the /signup route', async () => {
    let response = await request.post('/signup').send({
      username: 'tester',
      password: 'pass',
    });
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('tester');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('pass123');
  });
  test('allows user to sign up with a POST to the /signup route', async () => {
    let response = await request.post('/signin').set('headers', {authorization: 'insert password'} );
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('tester');
    expect(response.body.password).toBeTruthy();
    expect(response.body.password).not.toEqual('pass123');
  });
});