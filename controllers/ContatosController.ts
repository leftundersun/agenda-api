'use strict';
var writer = require('../utils/writer.ts');
var ContatoSrvc = require('../services/ContatosService');

/**
 * Criar um novo contato
 *
 * body ContatoJson Dados do contato a ser criado (optional)
 * returns BasicResponse
 **/
exports.createContato = (body) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}

/**
 * Excluir um contato
 *
 * id Integer Id do contato a ser excluído
 * returns BasicResponse
 **/
exports.deleteContato = (id, userId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ContatoSrvc.deleteContato(id, userId).then( () => {
            accept( writer.respondWithCode(200, { message: 'Contato excluído com sucesso' }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Filtrar contatos
 *
 * page Integer 
 * returns ContatoArray
 **/
exports.filterContato = (page) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}

/**
 * Encontrar um contato pelo id
 *
 * id Integer Id do contato a ser encontrado
 * returns ContatoJson
 **/
exports.findContatoById = (id) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}


/**
 * Editar um contato
 *
 * body ContatoJson Dados a serem atualizados no contato (optional)
 * id Integer Id do contato a ser atualizado
 * returns BasicResponse
 **/
exports.updateContato = (body,id) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        accept( writer.respondWithCode(501) )
    });
}