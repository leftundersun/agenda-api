'use strict';

var writer = require('../utils/writer.ts');
var Resources = require('../controllers/ResourcesController');

module.exports.filterPessoas = (req, res, next, withoutUser) => {
  Resources.filterPessoas(withoutUser).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.listCidades = (req, res, next, estadoId) => {
  Resources.listCidades(estadoId).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.listContatoCategorias = (req, res, next) => {
  Resources.listContatoCategorias().then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.listContatoTipos = (req, res, next) => {
  Resources.listContatoTipos().then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.listEstados = (req, res, next, paisId) => {
  Resources.listEstados(paisId).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.listPaises = (req, res, next) => {
  Resources.listPaises().then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};
