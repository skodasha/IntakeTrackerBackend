const path = require('node:path');
const pg = require('pg');
const {migrate} = require('postgres-migrations');

const {connectionString} = require('../src/config/config');

const runMigration = async () => {
  const client = new pg.Client({connectionString});
  await client.connect();

  try {
    await migrate({client}, path.join(__dirname, './migrations'));
  } finally {
    await client.end();
  }
};

runMigration();
