'use strict';

var utils = require('../utils/writer.ts');
var Contatos = require('../service/ContatosService');

module.exports.createContato = function createContato (req, res, next, body) {
  Contatos.createContato(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteContato = function deleteContato (req, res, next, id) {
  Contatos.deleteContato(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.filterContato = function filterContato (req, res, next, page) {
  Contatos.filterContato(page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findContatoById = function findContatoById (req, res, next, id) {
  Contatos.findContatoById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateContato = function updateContato (req, res, next, body, id) {
  Contatos.updateContato(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
