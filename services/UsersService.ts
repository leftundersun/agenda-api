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
var FileSrvc = require('./FileService');
var ResourceSrvc = require('./ResourcesService');
var writer = require('../utils/writer.ts');
var foreach = require('../utils/foreach').foreach;

exports.createUser = () => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.deleteUser = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.filterUser = (page) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.findUserById = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

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
                                include: {
                                    model: Pais,
                                    as: 'pais'
                                }
                            }
                        }
                    }
                },{
                    model: Pessoa,
                    as: 'favoritos',
                    include: [
                        {
                            model: Endereco,
                            include: {
                                model: Cidade,
                                include: {
                                    model: Estado,
                                    include: {
                                        model: Pais,
                                        as: 'pais'
                                    }
                                }
                            }
                        },{
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
                            },
                            include: [
                                {
                                    model: ContatoTipo,
                                    as: 'contatoTipo'
                                },
                                {
                                    model: ContatoCategoria,
                                    as: 'contatoCategoria'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        User.findOne(options).then( (user) => {
            if (user != null && user != undefined) {
                ResourceSrvc.getFotos(user.favoritos).then( (pessoas) => {
                    user.favoritos = pessoas
                    accept( formatUser(user) )
                }).catch( (err) => {
                    reject(err)
                })
            } else {
                reject( writer.respondWithCode(404, { message: 'Usuário não encontrado' }) )
            }
        }).catch( (err) => {
            reject(err)
        })
    });
}

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