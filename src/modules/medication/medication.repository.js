const DatabaseRepository = require('../../classes/db.repository');
const {getValuesFromObject, getWhereString} = require('../../utils/db');

class MedicationRepository extends DatabaseRepository {
  constructor(dbClient) {
    super(dbClient, 'Medication', [
      'id',
      'userId',
      'name',
      'description',
      'initialAmount',
      'targetAmount',
    ]);
  }

  async findMedicationsByUserId(userId) {
    const filter = getWhereString(this.tableName, {userId});
    const fieldsToSelect = `"${this.columnNames.join('", "')}"`;

    const sql = `
      SELECT ${fieldsToSelect}
      FROM public."${this.tableName}"
      WHERE ${filter}
      ORDER BY 
        ("initialAmount" >= "targetAmount") ASC,
        "createdAt" DESC;
    `;
    const queryResult = await this.dbClient.query(sql);

    return queryResult.rows || [];
  }

  async findMedicationById(id) {
    const filter = getWhereString(this.tableName, {id});
    const fieldsToSelect = `"${this.columnNames.join('", "')}"`;

    const sql = `SELECT ${fieldsToSelect} FROM public."${this.tableName}" WHERE ${filter};`;
    const queryResult = await this.dbClient.query(sql);

    return queryResult.rows[0] || null;
  }

  async createMedication(medication) {
    const keys = `"${Object.keys(medication).join('", "')}"`;
    const values = getValuesFromObject(medication).join(', ');

    const sql = `INSERT INTO public."${this.tableName}" (${keys}) VALUES (${values});`;

    await this.dbClient.query(sql);
  }

  async updateMedication(id, medicationTO) {
    const updates = Object.entries(medicationTO)
      .map(([key, value]) => `"${key}" = ${typeof value === 'string' ? `'${value}'` : value}`)
      .join(', ');

    const sql = `UPDATE public."${this.tableName}" SET ${updates} WHERE "id" = '${id}';`;

    await this.dbClient.query(sql);
  }

  async deleteMedicationById(id) {
    const filter = getWhereString(this.tableName, {id});
    const sql = `DELETE FROM public."${this.tableName}" WHERE ${filter};`;
    await this.dbClient.query(sql);
  }
}

module.exports = MedicationRepository;
