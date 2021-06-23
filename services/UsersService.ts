'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var User = db.user
var Role = db.role
var Pessoa = db.pessoa
var Endereco = db.endereco
var Estado = db.estado
var Cidade = db.cidade
var Pais = db.pais
var Contato = db.contato
var ContatoCategoria = db.contatoCategoria
var ContatoTipo = db.contatoTipo
var writer = require('../utils/writer.ts');

/**
 * Criar um novo usuário
 *
 * returns BasicResponse
 **/
exports.createUser = () => {
  return new Promise<void>((accept, reject) => {
    accept()
  });
}


/**
 * Excluir um usuário
 *
 * id Integer Id do usuário a ser excluído
 * returns BasicResponse
 **/
exports.deleteUser = (id) => {
  return new Promise<void>((accept, reject) => {
    accept()
  });
}


/**
 * Filtrar usuários
 *
 * page Integer 
 * returns UserArray
 **/
exports.filterUser = (page) => {
  return new Promise<void>((accept, reject) => {
    accept()
  });
}


/**
 * Encontrar um usuário pelo id
 *
 * id Integer Id do usuário a ser encontrado
 * returns UserJson
 **/
exports.findUserById = (id) => {
  return new Promise<void>((accept, reject) => {
    accept()
  });
}


/**
 * Pegar dados do usuário logado
 *
 * returns UserJson
 **/
exports.getUser = (id) => {
  return new Promise<object>((accept, reject) => {
    var options = {
      where: {
        id: id
      },
      include: [
        Role,
        {
          model: Pessoa,
          as: 'pessoa',
          include: {
            model: Endereco,
            include: {
              model: Cidade,
              include: {
                model: Estado,
                include: Pais
              }
            }
          }
        },{
          model: Pessoa,
          as: 'favoritos',
          include: {
            model: Contato,
            required: false,
            where: {
              [Op.or]: [
                { 
                  user_id: {
                    [Op.eq]: db.Sequelize.col('user.id')
                  }
                },{ 
                  publico: {
                    [Op.eq]: true
                  }
                }
              ]
            }
          }
        }
      ]
    }
    User.findOne(options).then( (user) => {
      if (user != null && user != undefined) {
        accept( formatUser(user) )
      } else {
        reject( writer.respondWithCode(404, { message: 'Usuário não encontrado' }) )
      }
    }).catch( (err) => {
      reject(err)
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
  return new Promise<void>((accept, reject) => {
    accept()
  });
}

var formatUser = (dbObj) => {
  var jsonObj = dbObj.toJSON()
  delete jsonObj.password
  delete jsonObj.createdAt
  delete jsonObj.updatedAt
  return jsonObj
}