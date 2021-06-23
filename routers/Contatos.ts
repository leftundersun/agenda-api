'use strict';

var writer = require('../utils/writer.ts');
var Contatos = require('../controllers/ContatosController');
var AuthSrvc = require('../services/AuthService');

module.exports.createContato = (req, res, next, body) => {
  AuthSrvc.verifyToken(req, res, (userId) => {
    Contatos.createContato(body, userId).then( (response) => {
      writer.writeJson(res, response);
    }).catch( (response) => {
      writer.writeJson(res, response);
    });
  })
};

module.exports.deleteContato = (req, res, next, id) => {
  Contatos.deleteContato(id).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.filterContato = (req, res, next, page) => {
  Contatos.filterContato(page).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.findContatoById = (req, res, next, id) => {
  Contatos.findContatoById(id).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};

module.exports.updateContato = (req, res, next, body, id) => {
  Contatos.updateContato(body, id).then( (response) => {
    writer.writeJson(res, response);
  }).catch( (response) => {
    writer.writeJson(res, response);
  });
};
