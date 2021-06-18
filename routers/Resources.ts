'use strict';

var utils = require('../utils/writer.ts');
var Resources = require('../service/ResourcesService');

module.exports.filterPessoas = function filterPessoas (req, res, next, withoutUser) {
  Resources.filterPessoas(withoutUser)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listCidades = function listCidades (req, res, next, estadoId) {
  Resources.listCidades(estadoId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listContatoCategorias = function listContatoCategorias (req, res, next) {
  Resources.listContatoCategorias()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listContatoTipos = function listContatoTipos (req, res, next) {
  Resources.listContatoTipos()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listEstados = function listEstados (req, res, next, paisId) {
  Resources.listEstados(paisId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listPaises = function listPaises (req, res, next) {
  Resources.listPaises()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
