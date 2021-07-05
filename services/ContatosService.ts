'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var Contato = db.contato
var Pessoa = db.pessoa
var ContatoCategoria = db.contatoCategoria
var ContatoTipo = db.contatoTipo
var writer = require('../utils/writer.ts');

exports.createContato = (data, userId, tx) => {
    return new Promise<void>((accept, reject) => {
        validateContato(data, tx).then( (data) => {
            Contato.create(data, { transaction: tx }).then( () => {
                accept()
            }).catch( (err) => {
                reject(err)
            })
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.deleteContato = (id, tx) => {
    return new Promise<void>((accept, reject) => {
        //todo
        accept()
    });
}

exports.deleteContatosByPessoaId = (pessoaId, tx) => {
    return new Promise<void>((accept, reject) => {
        Contato.destroy({ where: { pessoa_id: pessoaId }, transaction: tx }).then( () => {
            accept()
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.deleteContatosByUserId = (userId, tx) => {
    return new Promise<void>((accept, reject) => {
        Contato.destroy({ where: { user_id: userId }, transaction: tx }).then( () => {
            accept()
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.filterContato = (page) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.findContatoById = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.updateContato = (body,id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

var validateContato = (data, tx) => {
    return new Promise<any>((accept, reject) => {
        if ( data.value != null && data.value != undefined && data.value.trim() != '' ) {
            if (data.contato_tipo_id == 0) {
                data.contato_tipo_id = data.contatoTipo.id
            }
            if (data.contato_categoria_id == 0) {
                data.contato_categoria_id = data.contatoCategoria.id
            }
            if (data.contato_tipo_id > 0 && data.contato_categoria_id > 0 && data.pessoa_id > 0 && data.user_id > 0) {
                
                ContatoTipo.findOne({ where: { id: data.contato_tipo_id } }).then( (contatoTipo) => {
                    if (contatoTipo != null && contatoTipo != undefined) {

                        ContatoCategoria.findOne({ where: { id: data.contato_categoria_id } }).then( (contatoCategoria) => {
                            if (contatoCategoria != null && contatoCategoria != undefined) {

                                Pessoa.findOne({ where: { id: data.pessoa_id }, transaction: tx }).then( (pessoa) => {
                                    if (pessoa != null && pessoa != undefined) {
                                        accept(data)
                                    } else {
                                        reject( writer.respondWithCode(400, { message: 'Pessoa do contato não encontrada' }) )
                                    }
                                }).catch( (err) => {
                                    reject(err)
                                })
                            } else {
                                reject( writer.respondWithCode(400, { message: 'Categoria do contato não encontrado' }) )
                            }
                        }).catch( (err) => {
                            reject(err)
                        })
                    } else {
                        reject( writer.respondWithCode(400, { message: 'Tipo do contato não encontrado' }) )
                    }
                }).catch( (err) => {
                    reject(err)
                })
            } else {
                reject( writer.respondWithCode(400, { message: 'Informações do contato incompletas' }) )
            }
        } else {
            reject( writer.respondWithCode(400, { message: 'Informações do contato incompletas' }) )
        }
    })
}