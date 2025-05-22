const path = require('node:path');

const {getEnvVariable} = require('../utils/config');
const {getConnectionString} = require('../utils/db-client');

require('dotenv').config({
  path: path.join(__dirname, '../../.env'),
});

const config = {
  port: getEnvVariable('PORT', {defaultValue: 8080}),
  hashSalt: getEnvVariable('HASH_SALT', {isRequired: true}),
  accessTokenSecret: getEnvVariable('ACCESS_TOKEN_SECRET', {isRequired: true}),
  connectionString: getConnectionString({
    username: getEnvVariable('DB_USERNAME', {isRequired: true}),
    password: getEnvVariable('DB_PASSWORD', {isRequired: true}),
    host: getEnvVariable('DB_HOST', {isRequired: true}),
    port: getEnvVariable('DB_PORT', {isRequired: true}),
    databaseName: getEnvVariable('DB_NAME', {isRequired: true}),
  }),
};

module.exports = config;
