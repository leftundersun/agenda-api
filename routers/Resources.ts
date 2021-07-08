'use strict';

var writer = require('../utils/writer.ts');
var AuthSrvc = require('../services/AuthService');
var Resources = require('../controllers/ResourcesController');

module.exports.filterPessoas = (req, res, next, search, withoutUser) => {
    console.log('############ withoutUser')
    console.log(withoutUser)
    console.log('############ search')
    console.log(search)
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Resources.filterPessoas(withoutUser, search).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.listContatoCategorias = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Resources.listContatoCategorias().then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.listContatoTipos = (req, res, next) => {
    Resources.listContatoTipos().then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};

module.exports.listCidades = (req, res, next, search, estadoId) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Resources.listCidades(estadoId, search).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.listEstados = (req, res, next, paisId) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Resources.listEstados(paisId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.listPaises = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Resources.listPaises().then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.listRoles = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (userId) => {
        Resources.listRoles().then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};
