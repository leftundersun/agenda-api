'use strict';

var writer = require('../utils/writer.ts');
var PessoaSrvc = require('../services/PessoasService');


/**
 * Criar uma nova pessoa
 *
 * returns BasicResponse
 **/
exports.createPessoa = (body, files, loggedUserId) => {
  return new Promise<ResponsePayload>((accept, reject) => {
    console.log('######################## body')
    console.log(body)
    console.log('######################## files')
    console.log(files)
    console.log('######################## loggedUserId')
    console.log(loggedUserId)
    accept( writer.respondWithCode(200) )
  });
}


/**
 * Excluir uma pessoa
 *
 * id Integer Id da pessoa a ser excluída
 * returns BasicResponse
 **/
exports.deletePessoa = (id) => {
  return new Promise<ResponsePayload>((accept, reject) => {
    accept( writer.respondWithCode(501) )
  });
}


/**
 * Filtrar pessoas
 *
 * page Integer 
 * returns PessoaArray
 **/
exports.filterPessoa = (page) => {
  return new Promise<ResponsePayload>((accept, reject) => {
    accept( writer.respondWithCode(501) )
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

