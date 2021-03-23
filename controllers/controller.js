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
/*req.body*/
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
/*req.body*/
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
/*req.body*/
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
