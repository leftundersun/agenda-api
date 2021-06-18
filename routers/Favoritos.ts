'use strict';

var writer = require('../utils/writer.ts');
var Favoritos = require('../controllers/FavoritosController');

module.exports.addFavorito = (req, res, next, id) => {
  Favoritos.addFavorito(id).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.listFavoritos = (req, res, next) => {
  Favoritos.listFavoritos().then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.removeFavorito = (req, res, next, id) => {
  Favoritos.removeFavorito(id).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};
