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
var bcrypt = require('bcrypt')
var FileSrvc = require('./FileService');
var PessoaSrvc = require('./PessoasService');
var ResourceSrvc = require('./ResourcesService');
var writer = require('../utils/writer.ts');
var foreach = require('../utils/foreach').foreach;

exports.createUser = (data, userId, tx, ft) => {
    return new Promise<object>( (accept, reject) => {
        console.log('############## data')
        console.log(data)
        User.findOne({ where: { username: data.username }, transaction: tx }).then( (user) => {
            if (user != null && user != undefined) {
                reject( writer.respondWithCode(409, { message: 'Esse nome de usuário já está em uso' }) )
            } else {
                PessoaSrvc.createPessoa(data.pessoa, userId, tx, ft).then( (pessoa) => {
                    data.pessoa_id = pessoa.id
                    bcrypt.hash(data.password, 10).then( (hash) => {
                        data.password = hash
                        User.create(data, { transaction: tx }).then( (user) => {
                            var rolesIds = Array.from(data.roles, (role: any) => { return role.id })
                            user.addRoles(rolesIds, { transaction: tx }).then( () => {
                                accept(user)
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
    })
}

exports.deleteUser = (id) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

exports.filterUser = (page, search='', userId) => {
    return new Promise<object>((accept, reject) => {
        var options: any = {
            where: {
                [Op.or]: [
                    {
                        username: {
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
            },
            include: {
                model: Pessoa,
                as: 'pessoa',
                required: true,
                include: {
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
                }
            }
        }
        User.count(options).then( (count) => {
            options.limit = 20
            options.offset = (page - 1) * 20
            options.order = ['id']
            User.findAll(options).then( (results) => {
                ResourceSrvc.getPessoaOwnersFotos(results).then( (users) => {
                    results = users
                    accept({ totalCount: count, users: results })
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

exports.findUserById = (id) => {
    return new Promise<object>((accept, reject) => {
        var options = {
            where: {
                id: id
            },
            include: [
                Role,
                {
                    model: Pessoa,
                    as: 'pessoa',
                    include: {
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
                    }
                }
            ]
        }
        User.findOne(options).then( (user) => {
            if (user != null && user != undefined) {
                if (user.pessoa.foto != '') {
                    FileSrvc.getFoto(user.pessoa.foto).then( (data) => {
                        user.pessoa.foto = data
                        accept( formatUser(user) )
                    }).catch( (err) => {
                        reject(err)
                    })
                } else {
                    accept( formatUser(user) )
                }
            } else {
                reject( writer.respondWithCode(404, { message: 'Usuário não encontrado' }) )
            }
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.getUser = (id) => {
    return new Promise<object>((accept, reject) => {
        var options = {
            where: {
                id: id
            },
            include: [
                Role,
                {
                    model: Pessoa,
                    as: 'pessoa',
                    include: {
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
                    }
                },{
                    model: Pessoa,
                    as: 'favoritos',
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
                                            [Op.eq]: db.Sequelize.col('user.id')
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
            ]
        }
        User.findOne(options).then( (user) => {
            if (user != null && user != undefined) {
                ResourceSrvc.getPessoasFotos(user.favoritos).then( (pessoas) => {
                    user.favoritos = pessoas
                    accept( formatUser(user) )
                }).catch( (err) => {
                    reject(err)
                })
            } else {
                reject( writer.respondWithCode(404, { message: 'Usuário não encontrado' }) )
            }
        }).catch( (err) => {
            reject(err)
        })
    });
}

exports.updateUser = (data, id, userId, tx, tf) => {
    return new Promise<void>((accept, reject) => {
        console.log('############## data')
        console.log(data)
        var options: any = {
            where: {
                id: id
            },
            include: [
                Role,
                {
                    model: Pessoa,
                    as: 'pessoa',
                    include: {
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
                    }
                }
            ],
            transaction: tx
        }
        User.findOne(options).then( (user) => {
            if (user != null && user != undefined) {
                validateUser(data, tx, id).then( () => {
                    PessoaSrvc.updatePessoa(data.pessoa, data.pessoa_id, userId, tx, tf).then( () => {
                        var rolesIds = Array.from(data.roles, (role: any) => { return role.id })
                        var userRoles = Array.from(user.roles, (role: any) => { return role.id })
                        var rolesToAdd = rolesIds.filter( (roleId: number) => !userRoles.includes(roleId) )
                        var rolesToRemove = userRoles.filter( (roleId: number) => !rolesIds.includes(roleId) )
                        user.removeRoles(rolesToRemove, { transaction: tx }).then( () => {
                            user.addRoles(rolesToAdd, { transaction: tx }).then( () => {
                                bcryptPassword(data.password).then( (hash) => {
                                    if (hash.length > 0) {
                                        data.password = hash
                                    } else {
                                        delete data.password
                                    }
                                    delete data.id
                                    options = {
                                        where: {
                                            id: id
                                        },
                                        transaction: tx
                                    }
                                    User.update(data, options).then( () => {
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
                }).catch( (err) => {
                    reject(err)
                })
            } else {
                reject( writer.respondWithCode(404, { message: 'Usuário não encontrado' }) )
            }
        }).catch( (err) => {
            reject(err)
        })
    });
}

var bcryptPassword = (password) => {
    return new Promise<string>((accept, reject) => {
        if (password != null && password != undefined && password != '') {
            bcrypt.hash(password, 10).then( (hash) => {
                accept(hash)
            }).catch( (err) => {
                reject(err)
            })
        } else {
            accept('')
        }
    })
}

var validateUser = (data, tx, id=null) => {
    return new Promise<void>((accept, reject) => {
        var options: any = {
            where: {
                username: data.username
            },
            transaction: tx
        }
        if (id != null) {
            options.where.id = {
                [Op.ne]: id
            }
        }
        User.findOne(options).then( (user) => {
            if (user != null && user != undefined) {
                reject( writer.respondWithCode(409, { message: 'Esse nome de usuário já está em uso' }) )
            } else {
                accept()
            }
        }).catch( (err) => {
            reject(err)
        })
    })
}

var formatUser = (dbObj) => {
    var jsonObj = dbObj.toJSON()
    delete jsonObj.password
    delete jsonObj.createdAt
    delete jsonObj.updatedAt
    return jsonObj
}