require('dotenv').config()
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_DLCT, DB_NAME } = process.env;

module.exports = {
    "development": {
        "username": DB_USER,
        "password": DB_PASS,
        "database": DB_NAME,
        "host": DB_HOST,
        "port": DB_PORT,
        "dialect": DB_DLCT
    },
    "test": {
        "username": DB_USER,
        "password": DB_PASS,
        "database": DB_NAME,
        "host": DB_HOST,
        "port": DB_PORT,
        "dialect": DB_DLCT
    },
    "production": {
        "username": DB_USER,
        "password": DB_PASS,
        "database": DB_NAME,
        "host": DB_HOST,
        "port": DB_PORT,
        "dialect": DB_DLCT
    }
}
