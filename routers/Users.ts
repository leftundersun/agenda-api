'use strict';

var writer = require('../utils/writer.ts');
var UsersCtrl = require('../controllers/UsersController');
var AuthSrvc = require('../services/AuthService');

module.exports.createUser = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (loggedUser) => {
        UsersCtrl.createUser(req.body, req.files, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.deleteUser = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (loggedUser) => {
        UsersCtrl.deleteUser(id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.filterUser = (req, res, next, page, search) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (loggedUser) => {
        UsersCtrl.filterUser(page, search, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.findUserById = (req, res, next, id) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (loggedUser) => {
        UsersCtrl.findUserById(id).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    }, (loggedUser: any) => {
        if (id == loggedUser.id) {
            UsersCtrl.findUserById(id).then( (response) => {
                writer.writeJson(res, response);
            }).catch( (response) => {
                writer.writeJson(res, response);
            });
        } else {
            writer.writeJson( res, writer.respondWithCode(403, { message: 'Você não tem permissão para fazer isso' }) )
        }
    })
};

module.exports.getUser = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, [], (loggedUser) => {
        UsersCtrl.getUser(loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.updateUser = (req, res, next, body, id) => {
    AuthSrvc.verifyToken(req, res, ['admin'], (loggedUser) => {
        UsersCtrl.updateUser(req.body, req.files, id, loggedUser).then( (response) => {
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    }, (loggedUser: any) => {
        if (id == loggedUser.id) {
            UsersCtrl.updateUser(req.body, req.files, id, loggedUser).then( (response) => {
                writer.writeJson(res, response);
            }).catch( (response) => {
                writer.writeJson(res, response);
            });
        } else {
            writer.writeJson( res, writer.respondWithCode(403, { message: 'Você não tem permissão para fazer isso' }) )
        }
    });
};
