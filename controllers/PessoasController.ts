'use strict';
var writer = require('../utils/writer.ts');
var PessoaSrvc = require('../services/PessoasService');
var TransactionSrvc = require('../services/TransactionService');

/**
 * Criar uma nova pessoa
 *
 * returns BasicResponse
 **/
exports.createPessoa = (body, files, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        TransactionSrvc.transaction( (tx, ft) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                var data = JSON.parse(body.pessoa)
                data.foto = files[0]
                PessoaSrvc.createPessoa(data, userId, tx, ft).then( () => {
                    accept( writer.respondWithCode( 201, { message: 'Pessoa criada com sucesso' }) )
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
 * Excluir uma pessoa
 *
 * id Integer Id da pessoa a ser excluída
 * returns BasicResponse
 **/
exports.deletePessoa = (id, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        TransactionSrvc.transaction( (tx, ft) => {
            return new Promise<ResponsePayload>((accept, reject) => {
                PessoaSrvc.deletePessoa(id, userId, tx, ft).then( () => {
                    accept( writer.respondWithCode( 200, { message: 'Pessoa excluída com sucesso' }) )
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
 * Filtrar pessoas
 *
 * page Integer
 * search String
 * returns PessoaArray
 **/
exports.filterPessoa = (page, search, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        PessoaSrvc.filterPessoa(page, search, userId).then( (response) => {
            accept( writer.respondWithCode(200, response) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}


/**
 * Encontrar uma pessoa pelo id
 *
 * id Integer Id da pessoa a ser encontrada
 * returns PessoaJson
 **/
exports.findPessoaById = (id) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}


/**
 * Editar uma pessoa
 *
 * id Integer Id da pessoa a ser atualizada
 * returns BasicResponse
 **/
exports.updatePessoa = (id) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}

