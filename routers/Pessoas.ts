'use strict';
var writer = require('../utils/writer.ts');
var AuthSrvc = require('../services/AuthService');
var PessoasCtrl = require('../controllers/PessoasController');

module.exports.createPessoa = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        PessoasCtrl.createPessoa(req.body, req.files, userId).then( (response) => {
            console.log('########### response')
            console.log(response)
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.deletePessoa = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (userId) => {
        PessoasCtrl.deletePessoa(id, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.filterPessoa = (req, res, next, page, search) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        PessoasCtrl.filterPessoa(page, search, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.findPessoaById = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        PessoasCtrl.findPessoaById(id, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.updatePessoa = (req, res, next, id) => {
    PessoasCtrl.updatePessoa(id).then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};
