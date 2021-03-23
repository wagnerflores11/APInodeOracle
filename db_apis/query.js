const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
  `QUERY_HERE`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.NR_CNPJFILIAL = context.id;

    query += `\nwhere NR_CNPJFILIAL = :NR_CNPJFILIAL`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const baseQuery2 =
  `QUERY_HERE`;

async function sumimports(context) {
  let query = baseQuery2;
  const binds = {};

  if (context.id) {
    binds.tipo = context.id;

    query += `\nwhere tipo = :tipo`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.sumimports = sumimports;

const updateSql =
 `QUERY_HERE`;

  const options = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

async function update(emp) {
  const nf = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, nf, options);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return nf;
  } else {
    return null;
  }
}

module.exports.update = update;

 const createSql =
  `QUERY_HERE`;

async function create(emp) {
  const integration = Object.assign({}, emp);

  const options = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, integration, options);

  //integration.integration_id = result.outBinds.integration_id[0];

  // return integration;
}

module.exports.create = create; 


const insertSql =
 `QUERY_HERE`;


async function insert(emp) {
  const nf = Object.assign({}, emp);
  const result = await database.simpleExecute(insertSql, nf);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return nf;
  } else {
    return null;
  }
}

module.exports.insert = insert;


/*const deleteSql =
 'begin

    delete from job_history
    where employee_id = :employee_id;

    delete from employees
    where employee_id = :employee_id;

    :rowcount := sql%rowcount;

  end;'

async function del(id) {
  const binds = {
    employee_id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del; */