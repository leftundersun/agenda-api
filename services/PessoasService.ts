'use strict'
var db = require('../models')
var Op = db.Sequelize.Op
var User = db.user
var Pessoa = db.pessoa
var Endereco = db.endereco
var Estado = db.estado
var Cidade = db.cidade
var Pais = db.pais
var Contato = db.contato
var ContatoCategoria = db.contatoCategoria
var ContatoTipo = db.contatoTipo
var FileSrvc = require('./FileService')
var ResourceSrvc = require('./ResourcesService')
var EnderecosSrvc = require('./EnderecosService')
var ContatosSrvc = require('./ContatosService')
var foreach = require('../utils/foreach').foreach
var validateCpf = require('../utils/validate-cpf').validateCpf
var writer = require('../utils/writer.ts')
var moment = require('moment')

exports.createPessoa = (data, userId, tx, ft) => {
    return new Promise<object>( (accept, reject) => {
        console.log('############## data')
        console.log(data)
        if (data.id > 0) {
            accept(data)
        } else {
            FileSrvc.saveFoto( data.foto, ft, tx ).then( (filename) => {
                data.foto = filename ?? ''
                validatePessoa(data, tx).then( (data) => {
                    Pessoa.create( data, { transaction: tx } ).then( (pessoa) => {
                        data.endereco.pessoa_id = pessoa.id
                        EnderecosSrvc.createEndereco(data.endereco, userId, tx).then( () => {
                            createContatos(data.contatos ?? [], pessoa.id, userId, tx).then( () => {
                                accept(pessoa)
                            }).catch( (err) => {
                                reject(err)
                            })
                        }).catch( (err) => {
                            reject(err)
                        }) 
                    }).catch( (err) => {
                        reject(err)
                    })
                }).catch( (err) => {
                    reject(err)
                })
            }).catch( (err) => {
                reject(err)
            })
        }
    })
}

var createContatos = (contatos, pessoaId, userId, tx) => {
    return new Promise<void>((accept, reject) => {
        if (contatos != null && contatos != undefined) {
            foreach(contatos, (contato) => {
                return new Promise<void>((accept, reject) => {
                    contato.pessoa_id = pessoaId
                    contato.user_id = userId
                    ContatosSrvc.createContato(contato, userId, tx).then( () => {
                        accept()
                    }).catch( (err) => {
                        reject(err)
                    })
                })
            }).then( () => {
                accept()
            }).catch( (err) => {
                reject(err)
            })
        } else {
            accept()
        }
    })
}

var updateContatos = (contatos, pessoaId, userId, tx) => {
    return new Promise<void>((accept, reject) => {
        if (contatos != null && contatos != undefined) {
            foreach(contatos, (contato) => {
                return new Promise<void>((accept, reject) => {
                    if (contato.id > 0) {
                        ContatosSrvc.updateContato(contato, contato.id, userId, tx).then( () => {
                            accept()
                        }).catch( (err) => {
                            reject(err)
                        })
                    } else {
                        contato.pessoa_id = pessoaId
                        contato.user_id = userId
                        ContatosSrvc.createContato(contato, userId, tx).then( () => {
                            accept()
                        }).catch( (err) => {
                            reject(err)
                        })
                    }
                })
            }).then( () => {
                accept()
            }).catch( (err) => {
                reject(err)
            })
        } else {
            accept()
        }
    })
}

exports.deletePessoa = (id, userId, tx, ft) => {
    return new Promise<void>( (accept, reject) => {
        var options: any = {
            where: {
                id: id
            },
            include: [
                {
                    model: User,
                    as: 'benfeitores'
                }
            ],
            transaction: tx
        }
        Pessoa.findOne(options).then( (pessoa) => {
            if (pessoa != null && pessoa != undefined) {
                options = {
                    where: {
                        pessoa_id: id
                    }
                }
                User.findOne(options).then( (user) => {
                    if (user != null && user != undefined) {
                        reject( writer.respondWithCode(403, { message: 'Você não tem permissão para fazer isso' }) )
                    } else {
                        var pessoaBenfeitores = Array.from(pessoa.benfeitores, (benfeitor: any) => { return benfeitor.id })
                        pessoa.removeBenfeitores(pessoaBenfeitores, { transaction: tx }).then( () => {
                            FileSrvc.deleteFoto(pessoa.foto, ft).then( () => {
                                ContatosSrvc.deleteContatosByPessoaId(pessoa.id, tx).then( () => {
                                    EnderecosSrvc.deleteEnderecoByPessoaId(pessoa.id, tx).then( () => {
                                        pessoa.destroy({ transaction: tx }).then( () => {
                                            accept()
                                        }).catch( (err) => {
                                            reject(err)
                                        })
                                    }).catch( (err) => {
                                        reject(err)
                                    })
                                }).catch( (err) => {
                                    reject(err)
                                })
                            })
                        }).catch( (err) => {
                            reject(err)
                        })
                    }
                }).catch( (err) => {
                    reject(err)
                })
            } else {
                reject( writer.respondWithCode(404, { message: 'Pessoa não encontrada' }) )
            }
        })
    })
}

exports.filterPessoa = (page, search='', userId) => {
    return new Promise<object>( (accept, reject) => {
        var options: any = {
            where: {
                [Op.or]: [
                    {
                        nome: {
                            [Op.like]: `%${search}%`
                        }
                    }, {
                        cpf: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            },
        }
        Pessoa.count(options).then( (count) => {
            options.limit = 20
            options.offset = (page - 1) * 20
            options.order = ['id']
            options.include = [
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
                                    [Op.eq]: userId
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
                        },{
                            model: ContatoCategoria,
                            as: 'contatoCategoria'
                        }
                    ]
                }
            ]
            Pessoa.findAll(options).then( (results) => {
                ResourceSrvc.getPessoasFotos(results).then( (pessoas) => {
                    results = pessoas
                    accept({ totalCount: count, pessoas: results })
                }).catch( (err) => {
                    reject(err)
                })
            }).catch( (err) => {
                reject(err)
            })
        }).catch( (err) => {
            reject(err)
        })
    })
}

exports.findPessoaById = (id, userId) => {
    return new Promise<void>((accept, reject) => {
        var options = {
            where: {
                id: id
            },
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
                                    [Op.eq]: userId
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
                        },{
                            model: ContatoCategoria,
                            as: 'contatoCategoria'
                        }
                    ]
                }
            ]
        }
        Pessoa.findOne(options).then( (pessoa) => {
            if (pessoa != null && pessoa != undefined) {
                if (pessoa.foto != '') {
                    FileSrvc.getFoto(pessoa.foto).then( (data) => {
                        pessoa.foto = data
                        accept(pessoa)
                    }).catch( (err) => {
                        reject(err)
                    })
                } else {
                    accept(pessoa)
                }
            } else {
                reject( writer.respondWithCode(404, { message: 'Pessoa não encontrada' }) )
            }
        }).catch( (err) => {
            reject(err)
        })
    })
}

exports.updatePessoa = (data, id, userId, tx, ft) => {
    return new Promise<void>( (accept, reject) => {
        console.log('############## data')
        console.log(data)
        var options: any = {
            where: {
                id: id
            },
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
                                    [Op.eq]: userId
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
                        },{
                            model: ContatoCategoria,
                            as: 'contatoCategoria'
                        }
                    ]
                }
            ],
            transaction: tx
        }
        Pessoa.findOne(options).then( (pessoa) => {
            if (pessoa != null && pessoa != undefined) {
                options = {
                    where: {
                        pessoa_id: id
                    }
                }
                User.findOne(options).then( (user) => {
                    if ( (user != null && user != undefined) && user.id != userId ) {
                        reject( writer.respondWithCode(403, { message: 'Você não tem permissão para fazer isso' }) )
                    } else {
                        FileSrvc.saveFoto(data.foto, ft, tx).then( (filename) => {
                            if (filename != '') {
                                data.foto = filename
                            } else {
                                delete data.foto
                            }
                            validatePessoa(data, tx, id).then( (data) => {
                                delete data.id
                                options = {
                                    where: {
                                        id: id
                                    },
                                    transaction: tx
                                }
                                Pessoa.update(data, options).then( () => {
                                    data.endereco.pessoa_id = pessoa.id
                                    EnderecosSrvc.updateEndereco(data.endereco, data.endereco.id, userId, tx).then( () => {
                                        updateContatos(data.contatos, pessoa.id, userId, tx).then( () => {
                                            accept()
                                        }).catch( (err) => {
                                            reject(err)
                                        })
                                    }).catch( (err) => {
                                        reject(err)
                                    }) 
                                }).catch( (err) => {
                                    reject(err)
                                })
                            }).catch( (err) => {
                                reject(err)
                            })
                        }).catch( (err) => {
                            reject(err)
                        })
                    }
                }).catch( (err) => {
                    reject(err)
                })
            } else {
                reject( writer.respondWithCode(404, { message: 'Pessoa não encontrada' }) )
            }
        }).catch( (err) => {
            reject(err)
        })
    })
}


var validatePessoa = (data, tx, id=null) => {
    return new Promise<any>((accept, reject) => {
        if ( data.nome != null && data.nome != undefined && data.nome.trim() != '' ) {
            validateCpf(data.cpf, tx, id).then( (cpf) => {
                data.cpf = cpf
                validateDataNascimento(data).then( (data) => {
                    accept(data)
                }).catch( (err) => {
                    reject(err)
                })
            }).catch( (err) => {
                reject(err)
            })
        } else {
            reject( writer.respondWithCode(400, { message: 'Dados da pessoa incompletos' }) )
        }
    })
}

var validateDataNascimento = (data) => {
    return new Promise<any>((accept, reject) => {
        data.data_nascimento = moment(data.data_nascimento, 'DD/MM/YYYY', true)
        if (data.data_nascimento.isValid()) {
            accept(data)
        } else {
            reject( writer.respondWithCode(400, { message: 'Dados da pessoa inválidos' }) )
        }
    })
}