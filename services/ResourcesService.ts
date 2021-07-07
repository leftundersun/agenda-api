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
var writer = require('../utils/writer.ts');
var foreach = require('../utils/foreach').foreach;

var filterPessoas = (withoutUser=false, search) => {
    return new Promise<Array<object>>( (accept, reject) => {
        var options: any = {}
        if (withoutUser) {
            options = {
                where: {
                    '$user.id$': null,
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
                include: [
                    {
                        model: Endereco,
                        required: true,
                        include: {
                            model: Cidade,
                            required: true,
                            include: {
                                model: Estado,
                                required: true,
                                include: {
                                    model: Pais,
                                    required: true,
                                    as: 'pais'
                                }
                            }
                        }
                    },{
                        model: User,
                        as: 'user',
                        required: false
                    }
                ],
                limit: 50
            }
        } else {
            options = {
                where: {
                    [Op.or]: [
                        {
                            nome: {
                                [Op.like]: `%${search}%`
                            }
                        },{
                            cpf: {
                                [Op.like]: `%${search}%`
                            }
                        }
                    ]
                },
                include: {
                    model: Endereco,
                    required: true,
                    include: {
                        model: Cidade,
                        required: true,
                        include: {
                            model: Estado,
                            required: true,
                            include: {
                                model: Pais,
                                required: true,
                                as: 'pais'
                            }
                        }
                    }
                },
                limit: 50
            }
        }
        Pessoa.findAll(options).then( (pessoas) => {
            accept(pessoas)
        }).catch( (err) => {
            reject(err)
        })
    });
}

var listCidades = (estadoId, search) => {
    return new Promise<Array<object>>( (accept, reject) => {
        var options = {
            where: {
                estado_id: estadoId,
                nome: {
                    [Op.like]: `%${search.trim()}%`
                }
            }
        }
        Cidade.findAll(options).then( (cidades) => {
            accept(cidades)
        }).catch( (err) => {
            reject(err)
        })
    });
}

var listContatoCategorias = () => {
    return new Promise<Array<object>>( (accept, reject) => {
        ContatoCategoria.findAll().then( (categorias) => {
            accept(categorias)
        }).catch( (err) => {
            reject(err)
        })
    });
}

var listContatoTipos = () => {
    return new Promise<Array<object>>( (accept, reject) => {
        ContatoTipo.findAll().then( (tipos) => {
            accept(tipos)
        }).catch( (err) => {
            reject(err)
        })
    });
}

var listEstados = (paisId) => {
    return new Promise<Array<object>>( (accept, reject) => {
        Estado.findAll({ where: { pais_id: paisId } }).then( (estados) => {
            accept(estados)
        }).catch( (err) => {
            reject(err)
        })
    });
}

var listPaises = () => {
    return new Promise<Array<object>>( (accept, reject) => {
        Pais.findAll().then( (paises) => {
            accept(paises)
        }).catch( (err) => {
            reject(err)
        })
    });
}

var getFoto = (pessoa) => {
    return new Promise<void>( (accept, reject) => {
        if (pessoa.foto.trim() != '') {
            FileSrvc.getFoto(pessoa.foto).then( (data) => {
                pessoa.foto = data
                accept()
            }).catch( (err) => {
                reject(err)
            })
        } else {
            accept()
        }
    })
}

var getContatosFotos = (contatos) => {
    return new Promise<any>( (accept, reject) => {
        foreach(contatos, (contato) => {
            return new Promise<void>( (accept, reject) => {
                getFoto(contato.pessoa).then( () => {
                    accept()
                }).catch( (err) => {
                    reject(err)
                })
            })
        }).then( () => {
            accept(contatos)
        }).catch( (err) => {
            reject(err)
        })
    })
}

var getPessoasFotos = (pessoas) => {
    return new Promise<any>( (accept, reject) => {
        foreach(pessoas, getFoto).then( () => {
            accept(pessoas)
        }).catch( (err) => {
            reject(err)
        })
    })
}

module.exports = {
    filterPessoas: filterPessoas,
    listCidades: listCidades,
    listContatoCategorias: listContatoCategorias,
    listContatoTipos: listContatoTipos,
    listEstados: listEstados,
    listPaises: listPaises,
    getPessoasFotos: getPessoasFotos,
    getContatosFotos: getContatosFotos
}