'use strict';
var FileSrvc = require('./FileService');
var writer = require('../utils/writer.ts');
var foreach = require('../utils/foreach').foreach;

var filterPessoas = (withoutUser) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

var listCidades = (estadoId) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

var listContatoCategorias = () => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

var listContatoTipos = () => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

var listEstados = (paisId) => {
    return new Promise<void>((accept, reject) => {
        accept()
    });
}

var listPaises = () => {
    return new Promise<void>((accept, reject) => {
        accept()
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