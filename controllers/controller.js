const query = require('../db_apis/query.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await query.find(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;


async function sum(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await query.sumimports(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.sum = sum;

function getIntegrationFromRec(req) {
    const integration = {
--REQ
    };
   
    return integration;
  }
   
  async function post(req, res, next) {
    try {
      let integration = getIntegrationFromRec(req);
   
      integration = await query.create(integration);
   
      res.status(201).json(integration);
    } catch (err) {
      next(err);
    }
  }
   
  module.exports.post = post;

  function getNfFromRec(req) {
    const nf = {
--REQ
    };
   
    return nf;
  }


  async function put(req, res, next) {
    try {
      let nf = getNfFromRec(req);
  
      nf.CD_IDENTIFICACAO = parseInt(req.params.id, 10);
  
      nf = await query.update(nf);
  
      if (nf !== null) {
        res.status(200).json(nf);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  }
  
  module.exports.put = put;

  function insertNf(req) {
    const nf = {
    NR_CNPJFILIAL: req.body.NR_CNPJFILIAL,
    CD_SERIELEGAL: req.body.CD_SERIELEGAL,
    NR_NF: req.body.NR_NF,
    CD_MODELONF: req.body.CD_MODELONF,
    NR_CNPJCPFPES: req.body.NR_CNPJCPFPES,
    DT_EMISSAO: req.body.DT_EMISSAO,
    DT_SAIENT: req.body.DT_SAIENT,
    HR_SAIENT: req.body.HR_SAIENT,
    TP_ORIGEM: req.body.TP_ORIGEM,
    TP_OPERACAO: req.body.TP_OPERACAO,
    TP_SITUACAO: req.body.TP_SITUACAO,
    TP_NOTA: req.body.TP_NOTA,
    CD_CFOP: req.body.CD_CFOP,
    CD_EQUIPAMENTO: req.body.CD_EQUIPAMENTO,
    NR_CRO: req.body.NR_CRO,
    CD_TRANSACAO: req.body.CD_TRANSACAO,
    CD_CONDPGTO: req.body.CD_CONDPGTO,
    TP_FRETE: req.body.TP_FRETE,
    DT_AUTORIZACAO: req.body.DT_AUTORIZACAO,
    HR_AUTORIZACAO: req.body.HR_AUTORIZACAO,
    VL_TOTALNF: req.body.VL_TOTALNF,
    DS_LOGRADOURO: req.body.DS_LOGRADOURO,
    DS_NUMERO: req.body.DS_NUMERO,
    DS_COMPLEMENTO: req.body.DS_COMPLEMENTO,
    NR_CEP: req.body.NR_CEP,
    NM_BAIRRO: req.body.NM_BAIRRO,
    NM_CIDADE: req.body.NM_CIDADE,
    CD_UF: req.body.CD_UF,
    CD_PAIS: req.body.CD_PAIS,
    };
   
    return nf;
  }


  async function insert(req, res, next) {
    try {
      let nf = insertNf(req);
  
      nf.CD_IDENTIFICACAO = parseInt(req.params.id, 10);
  
      nf = await query.insert(nf);
  
      if (nf !== null) {
        res.status(200).json(nf);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  }
  
  module.exports.insert = insert;

  /*async function del(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
  
      const success = await employees.delete(id);
  
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  }
  
  module.exports.delete = del; */
