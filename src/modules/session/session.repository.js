const DatabaseRepository = require('../../classes/db.repository');
const {getValuesFromObject, getWhereString} = require('../../utils/db');

class SessionRepository extends DatabaseRepository {
  constructor(dbClient) {
    super(
      dbClient,
      'Session',
      [
        'id',
        'userId',
        'accessToken',
        'accessTokenExpires',
      ],
    );
  }

  async findSessionByAccessToken(accessToken) {
    const filter = getWhereString(this.tableName, {accessToken});
    const fieldsToSelect = `"${this.columnNames.join('", "')}"`;

    const sql = `SELECT ${fieldsToSelect} FROM public."${this.tableName}" WHERE ${filter};`;
    const queryResult = await this.dbClient.query(sql);

    return queryResult.rows[0] || null;
  }

  async createSession(sessionTO) {
    const keys = `"${Object.keys(sessionTO).join('", "')}"`;
    const values = getValuesFromObject(sessionTO).join(', ');

    const sql = `
      INSERT INTO public."${this.tableName}"
      (${keys}) VALUES (${values});
    `;

    await this.dbClient.query(sql);
  }

  async deleteSessionByAccessTokenAndUserId({accessToken, userId}) {
    const filter = getWhereString(this.tableName, {accessToken, userId});

    const sql = `
      DELETE FROM public."${this.tableName}"
      WHERE ${filter};
    `;

    await this.dbClient.query(sql);
  }
}

module.exports = SessionRepository;
