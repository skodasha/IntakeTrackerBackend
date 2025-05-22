const getStringValue = (value) => {
  if (typeof value === 'string' || value instanceof String) {
    // eslint-disable-next-line quotes
    const result = value.replace(/'/g, "''");
    return `'${result}'`;
  }

  if (value === null || value === undefined) {
    return 'NULL';
  }

  return value;
};

const getWhereString = (tableName, obj) => {
  if (obj?.constructor?.name !== 'Object') {
    return '';
  }

  const result = Object.keys(obj).map((key) => {
    if (obj[key] === undefined) {
      throw new Error(`Undefined is not supported in where clause (in ${key})`);
    }

    if (obj[key] === null) {
      return `"${tableName}"."${key}" IS NULL`;
    }

    if (Array.isArray(obj[key])) {
      return `"${tableName}"."${key}" IN (${obj[key].map((value) => getStringValue(value)).join(',')})`;
    }

    return `"${tableName}"."${key}" = ${getStringValue(obj[key])}`;
  }).join(' AND ');

  return result;
};

const getValuesFromObject = (obj) => {
  if (obj?.constructor?.name !== 'Object') {
    return [];
  }

  const values = Object.values(obj).map((object) => getStringValue(object));
  return values;
};

module.exports = {
  getStringValue,
  getWhereString,
  getValuesFromObject,
};
