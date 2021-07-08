'use strict';
var writer = require('../utils/writer.ts');
var UserSrvc = require('../services/UsersService');
var TransactionSrvc = require('../services/TransactionService');

/**
 * Criar um novo usuário
 *
 * returns BasicResponse
 **/
exports.createUser = (body, files, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        TransactionSrvc.transaction( (tx, ft) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                var data = JSON.parse(body.user)
                data.pessoa.foto = files ? files[0] : null
                UserSrvc.createUser(data, userId, tx, ft).then( () => {
                    accept( writer.respondWithCode(201, { message: 'Usuário criado com sucesso' }) )
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( (response) => {
            accept( response )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Excluir um usuário
 *
 * id Integer Id do usuário a ser excluído
 * returns BasicResponse
 **/
exports.deleteUser = (id, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        TransactionSrvc.transaction( (tx, ft) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                UserSrvc.deleteUser(id, userId, tx, ft).then( () => {
                    accept( writer.respondWithCode(200, { message: 'Usuário excluído com sucesso' }) )
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( (response) => {
            accept( response )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Filtrar usuários
 *
 * page Integer 
 * returns UserArray
 **/
exports.filterUser = (page, search, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        UserSrvc.filterUser(page, search, userId).then( (response) => {
            accept( writer.respondWithCode(200, response) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
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

