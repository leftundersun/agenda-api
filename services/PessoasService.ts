'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var Pessoa = db.pessoa
var FileSrvc = require('./FileService');
var EnderecosSrvc = require('./EnderecosService');
var ContatosSrvc = require('./ContatosService');
var foreach = require('../utils/foreach').foreach;
var writer = require('../utils/writer.ts');

exports.createPessoa = (data, userId, tx, ft) => {
    return new Promise<void>( (accept, reject) => {
        FileSrvc.saveFoto( data.foto, ft, tx ).then( (filename) => {
            data.foto = filename ?? ''
            Pessoa.create( data, { transaction: tx } ).then( (pessoa) => {
                data.endereco.pessoa_id
                EnderecosSrvc.createEndereco(data.endereco, userId, tx).then( () => {
                    createContatos(data.contatos, pessoa.id, userId, tx).then( () => {
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
    });
}

var createContatos = (contatos, pessoaId, userId, tx) => {
    return new Promise<void>((accept, reject) => {
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
    })
}

exports.deletePessoa = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.filterPessoa = (page) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.findPessoaById = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.updatePessoa = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}