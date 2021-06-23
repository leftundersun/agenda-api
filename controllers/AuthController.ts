'use strict';
var AuthSrvc = require('../services/AuthService');
var writer = require('../utils/writer.ts');

/**
 * Autentica usuário e devolve token
 *
 * returns inline_response_200
 **/
exports.login = (req) => {
  return new Promise<ResponsePayload>( (accept, reject) => {
    AuthSrvc.login(req).then( (token) => {
      accept( writer.respondWithCode(200, { token: token }) )
    }).catch( (err) => {
      reject( writer.tratarErro(err) )
    })
  });
}

