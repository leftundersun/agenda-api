'use strict';
var writer = require('../utils/writer.ts');
var Favoritos = require('../controllers/FavoritosController');
var AuthSrvc = require('../services/AuthService');

module.exports.addFavorito = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Favoritos.addFavorito(id, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.listFavoritos = (req, res, next) => {
    Favoritos.listFavoritos().then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};

module.exports.removeFavorito = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Favoritos.removeFavorito(id, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};
