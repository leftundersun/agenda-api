'use strict';

var writer = require('../utils/writer.ts');
var Contatos = require('../controllers/ContatosController');
var AuthSrvc = require('../services/AuthService');

module.exports.createContato = (req, res, next, body) => {
    console.log('################ body')
    console.log(body)
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Contatos.createContato(body, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.deleteContato = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Contatos.deleteContato(id, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.filterContato = (req, res, next, page, search) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Contatos.filterContato(page, search, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.findContatoById = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Contatos.findContatoById(id, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.updateContato = (req, res, next, body, id) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Contatos.updateContato(body, id, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};
