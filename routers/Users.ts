'use strict';

var writer = require('../utils/writer.ts');
var Users = require('../controllers/UsersController');
var AuthSrvc = require('../services/AuthService');

module.exports.createUser = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (userId) => {
        Users.createUser(req.body, req.files, userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.deleteUser = (req, res, next, id) => {
    Users.deleteUser(id).then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};

module.exports.filterUser = (req, res, next, page) => {
    Users.filterUser(page).then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};

module.exports.findUserById = (req, res, next, id) => {
    Users.findUserById(id).then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};

module.exports.getUser = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, [], (userId) => {
        Users.getUser(userId).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.updateUser = (req, res, next, id) => {
    Users.updateUser(id).then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};
