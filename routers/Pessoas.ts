'use strict';
var writer = require('../utils/writer.ts');
var AuthSrvc = require('../services/AuthService');
var PessoasCtrl = require('../controllers/PessoasController');

module.exports.createPessoa = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        PessoasCtrl.createPessoa(req.body, req.files, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.deletePessoa = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (loggedUser) => {
        PessoasCtrl.deletePessoa(id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.filterPessoa = (req, res, next, page, search) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        PessoasCtrl.filterPessoa(page, search, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.findPessoaById = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        PessoasCtrl.findPessoaById(id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.updatePessoa = (req, res, next, body, id) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        PessoasCtrl.updatePessoa(req.body, req.files, id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};
