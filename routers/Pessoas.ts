'use strict';
var writer = require('../utils/writer.ts');
var PessoasCtrl = require('../controllers/PessoasController');
var AuthSrvc = require('../services/AuthService');


/*
    {
        "nome": "Teste 1",
        "cpf": "33333333333",
        "data_nascimento": "01/01/2000",
        "endereco": {
            "complemento": "sala 404",
            "numero": "570",
            "bairro": "Centro",
            "logradouro": "R. Sladanha Marinho",
            "cidade_id": 4649
        },
        "contatos": [
            {
                "valor":"+5554987654321",
                "publico": false,
                "contato_tipo_id": 1,
                "contato_categoria_id": 1
            },
            {
                "valor":"teste1@gmail.com",
                "publico": true,
                "contato_tipo_id": 3,
                "contato_categoria_id": 1
            }
        ]
    }
*/
module.exports.createPessoa = (req, res, next) => {
    AuthSrvc.verifyToken(req, res, (userId) => {
        PessoasCtrl.createPessoa(req.body, req.files, userId).then( (response) => {
            console.log('########### response')
            console.log(response)
            writer.writeJson(res, response);
        }).catch( (response) => {
            writer.writeJson(res, response);
        });
    })
};

module.exports.deletePessoa = (req, res, next, id) => {
    PessoasCtrl.deletePessoa(id).then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};

module.exports.filterPessoa = (req, res, next, page) => {
    PessoasCtrl.filterPessoa(page).then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};

module.exports.findPessoaById = (req, res, next, id) => {
    PessoasCtrl.findPessoaById(id).then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};

module.exports.updatePessoa = (req, res, next, id) => {
    PessoasCtrl.updatePessoa(id).then( (response) => {
        writer.writeJson(res, response);
    }).catch( (response) => {
        writer.writeJson(res, response);
    });
};
