'use strict';
var writer = require('../utils/writer.ts');
var Favoritos = require('../controllers/FavoritosController');
var AuthSrvc = require('../services/AuthService');

module.exports.addFavorito = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        Favoritos.addFavorito(id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.removeFavorito = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        Favoritos.removeFavorito(id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};
