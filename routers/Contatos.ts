'use strict';

var writer = require('../utils/writer.ts');
var Contatos = require('../controllers/ContatosController');
var AuthSrvc = require('../services/AuthService');

module.exports.createContato = (req, res, next, body) => {
    console.log('################ body')
    console.log(body)
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        Contatos.createContato(body, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.deleteContato = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        Contatos.deleteContato(id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.filterContato = (req, res, next, page, search) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        Contatos.filterContato(page, search, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.findContatoById = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        Contatos.findContatoById(id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.updateContato = (req, res, next, body, id) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        Contatos.updateContato(body, id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};
