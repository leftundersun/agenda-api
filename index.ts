'use strict';

require('dotenv').config()
var path = require('path');
var http = require('http');
var express = require('express')
var cors = require('cors')
var helmet = require('helmet')

var oas3Tools = require('oas3-tools');
var serverPort = process.env.PORT;

var db = require('./models')
db.sequelize.sync()

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './routers')
    },
};

const app = express();
app.use(/.*/, cors());
app.use(helmet());

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var openApiApp = expressAppConfig.getApp();

for (let i = 2; i < openApiApp._router.stack.length; i++) {
    app._router.stack.push(openApiApp._router.stack[i])
}

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, () => {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

/*var fs = require('fs')
var TransactionSrvc = require('./services/TransactionService');
var PessoaSrvc = require('./services/PessoasService');
var foreach = require('./utils/foreach').foreach;
TransactionSrvc.transaction( (tx, ft) => {
    return new Promise<void>( (accept, reject) => {
        var indexes = []
        for(var i = 0; i < 10000; i++) {
            indexes.push(i)
        }
        foreach(indexes, (index) => {
            return new Promise<void>( (accept, reject) => {
                var pessoa: any = {
                    nome: "Teste " + index,
                    cpf: "33333333333",
                    data_nascimento: "01/01/2000",
                    endereco: {
                        complemento: "sala 404",
                        numero: "570",
                        bairro: "Centro",
                        logradouro: "R. Saldanha Marinho",
                        cidade_id: 4649
                    },
                    contatos: [
                        {
                            valor:"+5554987654321",
                            publico: false,
                            contato_tipo_id: 1,
                            contato_categoria_id: 1
                        },{
                            valor:"teste1@gmail.com",
                            publico: true,
                            contato_tipo_id: 3,
                            contato_categoria_id: 1
                        }
                    ]
                }
                fs.readFile('/home/anderson/Downloads/default-user-image.png', (err, data) => {
                    if (err != null && err != undefined) {
                        reject(err)
                    } else {
                        pessoa.foto = {
                            buffer: data,
                            mimetype: 'image/png'
                        }
                        PessoaSrvc.createPessoa(pessoa, 1, tx, ft).then( () => {
                            accept()
                        }).catch( (err) => {
                            reject(err)
                        })
                    }
                })
            })
        }).then( () => {
            accept()
        }).catch( (err) => {
            reject(err)
        })
    })
}).then( () => {
    console.log('Pessoas adicionadas com sucesso')
}).catch( (err) => {
    console.log('################### err')
    console.log(err)
})*/