'use strict';

var utils = require('../utils/writer.ts');
var Pessoas = require('../service/PessoasService');

module.exports.createPessoa = function createPessoa (req, res, next) {
  Pessoas.createPessoa()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deletePessoa = function deletePessoa (req, res, next, id) {
  Pessoas.deletePessoa(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.filterPessoa = function filterPessoa (req, res, next, page) {
  Pessoas.filterPessoa(page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.findPessoaById = function findPessoaById (req, res, next, id) {
  Pessoas.findPessoaById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updatePessoa = function updatePessoa (req, res, next, id) {
  Pessoas.updatePessoa(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
