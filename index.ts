'use strict';

require('dotenv').config()
var path = require('path');
var http = require('http');
var express = require('express')
var cors = require('cors')
var helmet = require('helmet')
var teste = require('crypto')

var oas3Tools = require('oas3-tools');
var serverPort = process.env.PORT;

var db = require('./models')

//set token secret
teste.randomBytes(64, (err, buf) => {
  if (err) {
  } else {
    process.env.TOKEN_SECRET = buf.toString('hex')
  }
})

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
});