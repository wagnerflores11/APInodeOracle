const http = require('http');
const morgan = require('morgan');
const express = require('express');
// line that requires ../config/web-server.js here
const database = require('./database.js');
const router = require('./router.js');
const webServerConfig = require('../config/web-server.js');
const cors = require('cors');
 
let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);



    app.use(cors());
    // Combines logging info from request and response
    app.use(morgan('combined'));
     // Parse incoming JSON requests and revive JSON.
     app.use(express.json({
      reviver: reviveJson
    }));
    
    const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
 
    function reviveJson(key, value) {
      // revive ISO 8601 date strings to instances of Date
      if (typeof value === 'string' && iso8601RegExp.test(value)) {
        return new Date(value);
      } else {
        return value;
      }
    }
 
    // Mount the router at /api so all its routes start with /api
    app.use('/api', router);
 
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}
 
module.exports.initialize = initialize;

// *** previous code above this line ***
 
function close() {
    return new Promise((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          reject(err);
          return;
        }
   
        resolve();
      });
    });
  }
   
  module.exports.close = close;