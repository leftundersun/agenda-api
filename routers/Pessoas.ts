'use strict';

var writer = require('../utils/writer.ts');
var Pessoas = require('../controllers/PessoasController');

module.exports.createPessoa = (req, res, next) => {
  Pessoas.createPessoa().then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.deletePessoa = (req, res, next, id) => {
  Pessoas.deletePessoa(id).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.filterPessoa = (req, res, next, page) => {
  Pessoas.filterPessoa(page).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.findPessoaById = (req, res, next, id) => {
  Pessoas.findPessoaById(id).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.updatePessoa = (req, res, next, id) => {
  Pessoas.updatePessoa(id).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};
