var writer = require('./writer.ts');
var db = require('../models')
var Op = db.Sequelize.Op
var Pessoa = db.pessoa

exports.validateCpf = (originalCpf: string, tx: any, id: number = null) => {
    return new Promise<string>( (accept, reject) => {
        if (originalCpf.length == 14) {
            originalCpf = originalCpf.split('.').join('').split('-').join('')
        }

        var cpf: any = originalCpf
        if (cpf.length == 11) {
            cpf = cpf.split('')

            var areAllDigitsSame = true
            for(var i = 1; i < cpf.length; i++) {
                if (cpf[i] != cpf[i-1]) {
                    areAllDigitsSame = false
                }
            }

            if (areAllDigitsSame) {
                reject( writer.respondWithCode(400, { message: 'CPF inválido' }) )
            } else {
                var dvs = cpf.splice(9, 2)

                var soma = 0
                for (var i = 10; i > 1; i--) {
                    soma += ( cpf[10 - i] * i )
                }
                var dv1 = (soma % 11) < 2 ? 0 : 11 - (soma % 11)

                cpf.push(dv1)

                soma = 0
                for (var i = 11; i > 1; i--) {
                    soma += ( cpf[11 - i] * i )
                }
                var dv2 = (soma % 11) < 2 ? 0 : 11 - (soma % 11)

                cpf.push(dv2)

                cpf = cpf.join('')
                if (cpf == originalCpf) {
                    var options: any = {
                        where: {
                            cpf: cpf
                        },
                        transaction: tx
                    }
                    if (id != null) {
                        options.where.id = {
                            [Op.ne]: id
                        }
                    }
                    Pessoa.findOne(options).then( (result) => {
                        if (result != null && result != undefined) {
                            reject( writer.respondWithCode(400, { message: 'CPF já cadastrado para outra pessoa' }) )
                        } else {
                            accept(cpf)
                        }
                    }).catch( (err) => {
                        reject(err)
                    })
                } else {
                    reject( writer.respondWithCode(400, { message: 'CPF inválido' }) )
                }
            }
        } else {
            reject( writer.respondWithCode(400, { message: 'CPF inválido' }) )
        }
    })
}

exports.createValidCpf = (tx) => {
    return new Promise<string>( (accept, reject) => {
        var create = () => {
            var digitos = [];
            for (var i = 0; i < 9; i++) {
                var digito = Math.floor(Math.random() * 10)
                digitos.push(digito)
            }

            var soma = 0
            var limit = 10
            for (var i = 0; i < (limit - 1); i++) {
                let digito = digitos[i]
                soma += digito * (limit - i)
            }
            digitos.push((soma % 11) < 2 ? 0 : 11 - (soma % 11))

            soma = 0
            limit = 11
            for (var i = 0; i < (limit - 1); i++) {
                let digito = digitos[i]
                soma += digito * (limit - i)
            }
            digitos.push((soma % 11) < 2 ? 0 : 11 - (soma % 11))

            var cpf = digitos.join('')

            Pessoa.findOne({ where: { cpf: cpf }, transaction: tx }).then( (result) => {
                if (result != null && result != undefined) {
                    create()
                } else {
                    accept(cpf)
                }
            }).catch( (err) => {
                reject(err)
            })
        }
        create()
    })
}