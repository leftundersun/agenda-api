'use strict';

var writer = require('../utils/writer.ts');
var UsersCtrl = require('../controllers/UsersController');
var AuthSrvc = require('../services/AuthService');

module.exports.createUser = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (userId) => {
        UsersCtrl.createUser(req.body, req.files, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.deleteUser = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (userId) => {
        UsersCtrl.deleteUser(id, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.filterUser = (req, res, next, page, search) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (userId) => {
        UsersCtrl.filterUser(page, search, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.findUserById = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (userId) => {
        UsersCtrl.findUserById(id).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.getUser = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        UsersCtrl.getUser(userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.updateUser = (req, res, next, body, id) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (userId) => {
        UsersCtrl.updateUser(req.body, req.files, id, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    });
};
