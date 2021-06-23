'use strict';


/**
 * Criar um novo contato
 *
 * body ContatoJson Dados do contato a ser criado (optional)
 * returns BasicResponse
 **/
exports.createContato = (body) => {
  return new Promise<void>((accept, reject) => {
    accept()
  });
}


/**
 * Excluir um contato
 *
 * id Integer Id do contato a ser excluído
 * returns BasicResponse
 **/
exports.deleteContato = (id) => {
  return new Promise<void>((accept, reject) => {
    accept()
  });
}


/**
 * Filtrar contatos
 *
 * page Integer 
 * returns ContatoArray
 **/
exports.filterContato = (page) => {
  return new Promise<void>((accept, reject) => {
    accept()
  });
}


/**
 * Encontrar um contato pelo id
 *
 * id Integer Id do contato a ser encontrado
 * returns ContatoJson
 **/
exports.findContatoById = (id) => {
  return new Promise<void>((accept, reject) => {
    accept()
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
  return new Promise<void>((accept, reject) => {
    accept()
  });
}

