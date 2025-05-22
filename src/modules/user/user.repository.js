const DatabaseRepository = require('../../classes/db.repository');
const {getValuesFromObject, getWhereString} = require('../../utils/db');

class UserRepository extends DatabaseRepository {
  constructor(dbClient) {
    super(
      dbClient,
      'User',
      [
        'id',
        'email',
        'password',
      ],
    );
  }

  async findUserByEmail(email) {
    const filter = getWhereString(this.tableName, {email});
    const fieldsToSelect = `"${this.columnNames.join('", "')}"`;

    const sql = `SELECT ${fieldsToSelect} FROM public."${this.tableName}" WHERE ${filter};`;
    const queryResult = await this.dbClient.query(sql);

    return queryResult.rows[0] || null;
  }

  async findUserById(id) {
    const filter = getWhereString(this.tableName, {id});
    const fieldsToSelect = `"${this.columnNames.join('", "')}"`;

    const sql = `SELECT ${fieldsToSelect} FROM public."${this.tableName}" WHERE ${filter};`;
    const queryResult = await this.dbClient.query(sql);

    return queryResult.rows[0] || null;
  }

  async createUser(userTO) {
    const keys = `"${Object.keys(userTO).join('", "')}"`;
    const values = getValuesFromObject(userTO).join(', ');

    const sql = `
      INSERT INTO public."${this.tableName}"
      (${keys}) VALUES (${values});
    `;

    await this.dbClient.query(sql);
  }
}

module.exports = UserRepository;
