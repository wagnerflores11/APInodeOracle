const express = require('express');
const router = new express.Router();
const controller = require('../controllers/controller.js');
 
router.route('/controller/:id?')
  .get(controller.get)
  //.post(controller.post)
  .post(controller.insert)
  //.delete(employees.delete);

router.route('/sum')
   .get(controller.sum);




  
module.exports = router;