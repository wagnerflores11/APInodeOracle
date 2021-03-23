const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
  `SELECT NR_CNPJFILIAL,
            CD_SERIELEGAL,
            NR_NF,
            CD_MODELONF,
            NR_CNPJCPFPES,
            DT_EMISSAO,
            DT_SAIENT,
            HR_SAIENT,
            TP_ORIGEM,
            TP_OPERACAO,
            TP_SITUACAO,
            TP_NOTA,
            CD_CFOP,
            CD_EQUIPAMENTO,
            NR_CRO,
            CD_TRANSACAO,
            CD_CONDPGTO,
            TP_FRETE,
            DT_AUTORIZACAO,
            HR_AUTORIZACAO,
            VL_TOTALNF,
            DS_LOGRADOURO,
            DS_NUMERO,
            DS_COMPLEMENTO,
            NR_CEP,
            NM_BAIRRO,
            NM_CIDADE,
            CD_UF,
            CD_PAIS
FROM INT_NF`;

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
  `SELECT TIPO, 
  SUM(AGUARDANDO)  "AGUARDANDO",
  SUM(PENDENTE)  "PENDENTE", 
  SUM(IMPORTADO)  "IMPORTADO", 
  SUM(ERRO) "ERRO" 
FROM VW_STATUS_CTRL GROUP BY TIPO`;

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
 `update INT_NF set NR_CNPJFILIAL = :NR_CNPJFILIAL,
    CD_SERIELEGAL = :CD_SERIELEGAL,
    NR_NF = :NR_NF,
    CD_MODELONF = :CD_MODELONF,
    NR_CNPJCPFPES = :NR_CNPJCPFPES,
    DT_EMISSAO = :DT_EMISSAO,
    DT_SAIENT = :DT_SAIENT,
    HR_SAIENT = :HR_SAIENT,
    TP_ORIGEM = :TP_ORIGEM,
    TP_OPERACAO = :TP_OPERACAO,
    TP_SITUACAO = :TP_SITUACAO,
    TP_NOTA = :TP_NOTA,
    CD_CFOP = :CD_CFOP,
    CD_EQUIPAMENTO = :CD_EQUIPAMENTO,
    NR_CRO = :NR_CRO,
    CD_TRANSACAO = :CD_TRANSACAO,
    CD_CONDPGTO = :CD_CONDPGTO,
    TP_FRETE = :TP_FRETE,
    DT_AUTORIZACAO = :DT_AUTORIZACAO,
    HR_AUTORIZACAO = :HR_AUTORIZACAO,
    VL_TOTALNF = :VL_TOTALNF,
    DS_LOGRADOURO = :DS_LOGRADOURO,
    DS_NUMERO = :DS_NUMERO,
    DS_COMPLEMENTO = :DS_COMPLEMENTO,
    NR_CEP = :NR_CEP,
    NM_BAIRRO = :NM_BAIRRO,
    NM_CIDADE = :NM_CIDADE,
    CD_UF = :CD_UF,
    CD_PAIS = :CD_PAIS,
  where NR_NF = :NR_NF`;

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
  `INSERT INTO GLB_DEPARA (
    CD_SISTEMA,
    NR_CNPJ,
    NM_CAMPO,
    NR_SEQ,
    VL_SATELITE,
    VL_ERP
  ) values (
    :CD_SISTEMA,
    :NR_CNPJ,
    :NM_CAMPO,
    :NR_SEQ,
    :VL_SATELITE,
    :VL_ERP
  )`;

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
 `insert into INT_NF (
    NR_CNPJFILIAL,
    CD_SERIELEGAL,
    NR_NF,
    CD_MODELONF,
    NR_CNPJCPFPES,
    DT_EMISSAO,
    DT_SAIENT,
    HR_SAIENT,
    TP_ORIGEM,
    TP_OPERACAO,
    TP_SITUACAO,
    TP_NOTA,
    CD_CFOP,
    CD_EQUIPAMENTO,
    NR_CRO,
    CD_TRANSACAO,
    CD_CONDPGTO,
    TP_FRETE,
    DT_AUTORIZACAO,
    HR_AUTORIZACAO,
    VL_TOTALNF,
    DS_LOGRADOURO,
    DS_NUMERO,
    DS_COMPLEMENTO,
    NR_CEP,
    NM_BAIRRO,
    NM_CIDADE,
    CD_UF,
    CD_PAIS
  ) values (
    :NR_CNPJFILIAL,
    :CD_SERIELEGAL,
    :NR_NF,
    :CD_MODELONF,
    :NR_CNPJCPFPES,
    :DT_EMISSAO,
    :DT_SAIENT,
    :HR_SAIENT,
    :TP_ORIGEM,
    :TP_OPERACAO,
    :TP_SITUACAO,
    :TP_NOTA,
    :CD_CFOP,
    :CD_EQUIPAMENTO,
    :NR_CRO,
    :CD_TRANSACAO,
    :CD_CONDPGTO,
    :TP_FRETE,
    :DT_AUTORIZACAO,
    :HR_AUTORIZACAO,
    :VL_TOTALNF,
    :DS_LOGRADOURO,
    :DS_NUMERO,
    :DS_COMPLEMENTO,
    :NR_CEP,
    :NM_BAIRRO,
    :NM_CIDADE,
    :CD_UF,
    :CD_PAIS
  )`;


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