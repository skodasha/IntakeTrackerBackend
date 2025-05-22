const {Pool} = require('pg');

const createDatabaseClient = ({connectionString}) => {
  const pool = new Pool({
    connectionString,
    max: 20,
  });

  return pool;
};

const getConnectionString = ({
  username,
  password,
  host,
  port,
  databaseName,
}) => `postgresql://${username}:${password}@${host}:${port}/${databaseName}`;

module.exports = {
  createDatabaseClient,
  getConnectionString,
};
