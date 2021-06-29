'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var Contato = db.contato
var writer = require('../utils/writer.ts');

exports.createContato = (data, userId, tx) => {
    return new Promise<void>((accept, reject) => {
        Contato.create(data, { transaction: tx }).then( () => {
            accept()
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

