'use strict';
var writer = require('../utils/writer.ts');
var ResourceSrvc = require('../services/ResourcesService');

/**
 * Filtrar pessoas a serem selecionadas em forms
 *
 * withoutUser Boolean    (optional)
 * returns PessoaArray
 **/
exports.filterPessoas = (withoutUser, search) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ResourceSrvc.filterPessoas(withoutUser, search).then( (pessoas) => {
            accept( writer.respondWithCode(200, { pessoas: pessoas }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Listar categorias de contatos
 *
 * returns ContatoCategoriaArray
 **/
exports.listContatoCategorias = () => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ResourceSrvc.listContatoCategorias().then( (categorias) => {
            accept( writer.respondWithCode(200, { categorias: categorias }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Listar tipos de contatos
 *
 * returns ContatoTipoArray
 **/
exports.listContatoTipos = () => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ResourceSrvc.listContatoTipos().then( (tipos) => {
            accept( writer.respondWithCode(200, { tipos: tipos }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Listar cidades de um estado
 *
 * estadoId Integer Id do estado do qual listar as cidades
 * returns CidadeArray
 **/
exports.listCidades = (estadoId, search) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ResourceSrvc.listCidades(estadoId, search).then( (cidades) => {
            accept( writer.respondWithCode(200, { cidades: cidades }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Listar estados de um país
 *
 * paisId Integer Id do país do qual listar os estados
 * returns EstadoArray
 **/
exports.listEstados = (paisId) => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ResourceSrvc.listEstados(paisId).then( (estados) => {
            accept( writer.respondWithCode(200, { estados: estados }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Listar paises
 *
 * returns PaisArray
 **/
exports.listPaises = () => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ResourceSrvc.listPaises().then( (paises) => {
            accept( writer.respondWithCode(200, { paises: paises }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}

/**
 * Listar roles
 *
 * returns RoleArray
 **/
exports.listRoles = () => {
    return new Promise<ResponsePayload>((accept, reject) => {
        ResourceSrvc.listRoles().then( (roles) => {
            accept( writer.respondWithCode(200, { roles: roles }) )
        }).catch( (err) => {
            reject( writer.tratarErro(err) )
        })
    });
}