'use strict';

var writer = require('../utils/writer.ts');
var UserSrvc = require('../services/UsersService');

/**
 * Criar um novo usuário
 *
 * returns BasicResponse
 **/
exports.createUser = () => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}


/**
 * Excluir um usuário
 *
 * id Integer Id do usuário a ser excluído
 * returns BasicResponse
 **/
exports.deleteUser = (id) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}


/**
 * Filtrar usuários
 *
 * page Integer 
 * returns UserArray
 **/
exports.filterUser = (page) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}


/**
 * Encontrar um usuário pelo id
 *
 * id Integer Id do usuário a ser encontrado
 * returns UserJson
 **/
exports.findUserById = (id) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}


/**
 * Pegar dados do usuário logado
 *
 * returns UserJson
 **/
exports.getUser = (loggedUserId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        UserSrvc.getUser(loggedUserId).then( (user) => {
            accept( writer.respondWithCode(200, { user: user }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Editar um usuário
 *
 * id Integer Id do usuário a ser atualizado
 * returns BasicResponse
 **/
exports.updateUser = (id) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}

