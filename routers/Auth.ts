'use strict';

var utils = require('../utils/writer.ts');
var Auth = require('../service/AuthService');

module.exports.login = function login (req, res, next) {
  Auth.login()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
