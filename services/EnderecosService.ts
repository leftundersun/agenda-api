'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var Endereco = db.endereco

exports.createEndereco = (data, userId, tx) => {
    return new Promise<void>((accept, reject) => {
        Endereco.create(data, { transaction: tx }).then( () => {
            accept()
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.deleteEndereco = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.deleteEnderecoByPessoaId = (pessoaId, tx) => {
    return new Promise<void>((accept, reject) => {
        Endereco.destroy({ where: { pessoa_id: pessoaId }, transaction: tx }).then( () => {
            accept()
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.findEnderecoById = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.updateEndereco = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}