'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var Contato = db.contato
var Pessoa = db.pessoa
var User = db.user
var ContatoCategoria = db.contatoCategoria
var ContatoTipo = db.contatoTipo
var ResourceSrvc = require('./ResourcesService')
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

exports.deleteContato = (id, userId) => {
    return new Promise<void>((accept, reject) => {
        var options = {
            where: {
                id: id,
                [Op.or]: [
                    { user_id: userId },
                    { publico: true }
                ]
            }
        }
        Contato.findOne(options).then( (contato) => {
            if (contato != null && contato != undefined) {
                if (contato.user_id == userId) {
                    contato.destroy().then( () => {
                        accept()
                    }).catch( (err) => {
                        reject(err)
                    })
                } else {
                    reject( writer.respondWithCode(403, { message: 'Você não tem permissão para fazer isso' }) )
                }
            } else {
                reject( writer.respondWithCode(404, { message: 'Contato não encontrado' }) )
            }
        }).catch( (err) => {
            reject(err)
        })
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

exports.filterContato = (page, search='', userId) => {
    return new Promise<object>((accept, reject) => {
        var options: any = {
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            {
                                valor: {
                                    [Op.like]: `%${search}%`
                                }
                            },{
                                '$pessoa.nome$': {
                                    [Op.like]: `%${search}%`
                                }
                            },{
                                '$pessoa.cpf$': {
                                    [Op.like]: `%${search}%`
                                }
                            }
                        ]
                    },{
                        [Op.or]: [
                            { 
                                user_id: {
                                    [Op.eq]: userId
                                }
                            },{ 
                                publico: {
                                    [Op.eq]: true
                                }
                            }
                        ]
                    }
                ]
            },
            include: [
                {
                    model: ContatoTipo,
                    required: true,
                    as: 'contatoTipo'
                },{
                    model: ContatoCategoria,
                    required: true,
                    as: 'contatoCategoria'
                },{
                    model: Pessoa,
                    required: true,
                    include: {
                        model: User,
                        attributes: ['id'],
                        as: 'benfeitores',
                        required: false,
                        where: {
                            id: userId
                        }
                    }
                },{
                    model: User,
                    attributes: ['id', 'username'],
                    include: {
                        model: Pessoa,
                        as: 'pessoa'
                    }
                }
            ]
        }
        Contato.count(options).then( (count) => {
            options.limit = 20
            options.offset = (page - 1) * 20
            options.order = ['id']
            Contato.findAll(options).then( (results) => {
                ResourceSrvc.getPessoaOwnersFotos(results).then( (contatos) => {
                    results = contatos
                    accept({ totalCount: count, contatos: results })
                }).catch( (err) => {
                    reject(err)
                })
            }).catch( (err) => {
                reject(err)
            })
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.findContatoById = (id, userId) => {
    return new Promise<void>((accept, reject) => {
        var options: any = {
            where: {
                [Op.and]: [
                    {
                        id: id
                    },{
                        [Op.or]: [
                            { 
                                user_id: {
                                    [Op.eq]: userId
                                }
                            },{ 
                                publico: {
                                    [Op.eq]: true
                                }
                            }
                        ]
                    }
                ]
            },
            include: [
                {
                    model: ContatoTipo,
                    as: 'contatoTipo'
                },{
                    model: ContatoCategoria,
                    as: 'contatoCategoria'
                },{
                    model: Pessoa
                }
            ]
        }
        Contato.findOne(options).then( (contato) => {
            accept(contato)
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.updateContato = (data, id, userId, tx) => {
    return new Promise<void>((accept, reject) => {
        var options = {
            where: {
                id: id
            },
            transaction: tx
        }
        Contato.findOne(options).then( (contato) => {
            if (contato != null && contato != undefined) {
                if (contato.user_id != userId) {
                    reject( writer.respondWithCode(403, { message: 'Você não tem permissão para fazer isso' }) )
                } else {
                    validateContato(data, tx).then( (data) => {
                        delete data.id
                        Contato.update(data, { where: { id: id }, transaction: tx }).then( () => {
                            accept()
                        }).catch( (err) => {
                            reject(err)
                        })
                    }).catch( (err) => {
                        reject(err)
                    })
                }
            } else {
                reject( writer.respondWithCode(404, { message: 'Contato não encontrado' }) )
            }
        }).catch( (err) => {
            reject(err)
        })
    });
}

var validateContato = (data, tx) => {
    return new Promise<any>((accept, reject) => {
        if ( data.valor != null && data.valor != undefined && data.valor.trim() != '' ) {
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