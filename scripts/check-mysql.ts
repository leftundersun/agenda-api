require('dotenv').config()
var mysql = require('mysql2')

var checkConnection = () => {
  return new Promise<void>( (accept, reject) => {
    var check = () => {
      return new Promise<any>( (accept, reject) => {
        var connection
        connection = mysql.createConnection({
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASS
        })
        connection.query('SHOW DATABASES',  (err, results, fields) => {
          accept(err)
        })
      })
    }
    var checkUntilItWorks = () => {
      check().then( (err) => {
        if (err) {
          setTimeout(checkUntilItWorks, 5000)
        } else {
          accept()
        }
      }).catch( (err) => {
        reject(err)
      })
    }
    checkUntilItWorks()
  })
}

checkConnection().then( () => {
  console.info("Conectado com sucesso ao banco de dados")
  process.exit()
}).catch( (err) => {
  console.error("Erro ao conectar ao banco de dados: " + err)
  process.exit(1)
})