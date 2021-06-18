'use strict';

var writer = require('../utils/writer.ts');
var Auth = require('../controllers/AuthController');

module.exports.login = (req, res, next) => {
  Auth.login().then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};
