const {types} = require('pg');

// NOTE: Is used to automatically convert BIGINT treated by postgres as a string to number
//       !!! BIGINT with more than 15 digits will not be accurate as a number
types.setTypeParser(types.builtins.INT8, parseInt);
types.setTypeParser(types.builtins.NUMERIC, parseFloat);

const META_FIELDS = [
  'createdAt',
  'updatedAt',
  'createdBy',
  'updatedBy',
];

class DatabaseRepository {
  constructor(dbClient, tableName, columnNames) {
    this.dbClient = dbClient;
    this.tableName = tableName;
    this.columnNames = [...columnNames, ...META_FIELDS];
  }
}

module.exports = DatabaseRepository;
