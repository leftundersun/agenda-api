'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('pessoas', [{
            nome: 'Admin',
            cpf: '11111111111',
            data_nascimento: new Date(),
            foto: '',
            created_at: new Date(),
            updated_at: new Date()
        },{
            nome: 'User',
            cpf: '22222222222',
            data_nascimento: new Date(),
            foto: '',
            created_at: new Date(),
            updated_at: new Date()
        }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('pessoas', null, {});
    }
};
