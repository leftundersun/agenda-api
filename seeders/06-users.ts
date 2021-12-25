'use strict';
var bcrypt = require('bcrypt')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            username: 'root',
            password: bcrypt.hashSync('123', 10),
            pessoa_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        },{
            username: 'user',
            password: bcrypt.hashSync('123', 10),
            pessoa_id: 2,
            created_at: new Date(),
            updated_at: new Date()
        }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
