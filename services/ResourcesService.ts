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

var filterPessoas = (withoutUser) => {
    return new Promise<void>( (accept, reject) => {
        accept()
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

var getFotos = (pessoas) => {
    return new Promise<any>( (accept, reject) => {
        foreach(pessoas, (pessoa) => {
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
        }).then( () => {
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
    getFotos: getFotos
}