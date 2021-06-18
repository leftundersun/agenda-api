'use strict';

var utils = require('../utils/writer.ts');
var Favoritos = require('../service/FavoritosService');

module.exports.addFavorito = function addFavorito (req, res, next, id) {
  Favoritos.addFavorito(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listFavoritos = function listFavoritos (req, res, next) {
  Favoritos.listFavoritos()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeFavorito = function removeFavorito (req, res, next, id) {
  Favoritos.removeFavorito(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
