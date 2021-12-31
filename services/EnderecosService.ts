'use strict';
var db = require('../models')
var Op = db.Sequelize.Op
var Endereco = db.endereco
var Cidade = db.cidade
var writer = require('../utils/writer.ts');

exports.createEndereco = (data, userId, tx) => {
    return new Promise<void>( (accept, reject) => {
        validateEndereco(data).then( (data) => {
            Endereco.create(data, { transaction: tx }).then( () => {
                accept()
            }).catch( (err) => {
                reject(err)
            })
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
    return new Promise<void>( (accept, reject) => {
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

exports.updateEndereco = (data, id, userId, tx) => {
    return new Promise<void>( (accept, reject) => {
        var options = {
            where: {
                id: id
            },
            transaction: tx
        }
        Endereco.findOne(options).then( (endereco) => {
            if (endereco != null && endereco != undefined) {
                validateEndereco(data).then( (data) => {
                    delete data.id
                    Endereco.update(data, options).then( () => {
                        accept()
                    }).catch( (err) => {
                        reject(err)
                    })
                }).catch( (err) => {
                    reject(err)
                })
            } else {
                reject( writer.respondWithCode(404, { message: 'Endereço não encontrado' }) )
            }
        }).catch( (err) => {
            reject(err)
        })
    });
}

var validateEndereco = (data) => {
    return new Promise<any>( (accept, reject) => {
        var isValid = (field) => {
            console.log('######## field')
            console.log(field)
            console.log(data[field])
            return ( data[field] != null && data[field] != undefined && data[field].trim() != '' )
        }
        var fields = ['bairro', 'logradouro', 'numero', 'cep']
        var fieldsAreValid = true
        fields.forEach( (field) => {
            if (!isValid(field)) {
                fieldsAreValid = false
            }
        })
        if (!fieldsAreValid) {
            reject( writer.respondWithCode(400, { message: 'Informações de endereço incompletas' }) )
        } else {
            if (data.complemento == null || data.complemento == undefined) {
                data.complemento = ''
            }
            if (data.cidade_id == 0) {
                data.cidade_id = data.cidade.id
            }
            console.log('######## data.cidade_id')
            console.log(data.cidade_id)
            console.log('######## data.pessoa_id')
            console.log(data.pessoa_id)
            if (data.cidade_id > 0 && data.pessoa_id > 0) {
                Cidade.findOne({ where: { id: data.cidade_id } }).then( (cidade) => {
                    validateCep(data.cep).then( (cep) => {
                        data.cep = cep
                        if (cidade != null && cidade != undefined) {
                            accept(data)
                        } else {
                            reject( writer.respondWithCode(400, { message: 'Cidade não encontrada' }) )
                        }
                    })
                }).catch( (err) => {
                    reject(err)
                })
            } else {
                reject( writer.respondWithCode(400, { message: 'Informações de endereço incompletas' }) )
            }
        }
    })
}

var validateCep = (cep) => {
    return new Promise<string>( (accept, reject) => {
        if (cep.length == 10) {
            cep = cep.split('.').join('')
        }
        if (cep.length == 9) {
            cep = cep.split('-').join('')
        }
        if (cep.length == 8) {
            accept(cep)
        } else {
            reject( writer.respondWithCode(400, { message: 'CEP inválido' }) )
        }
    })
}