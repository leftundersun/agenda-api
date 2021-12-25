'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('contato_tipos', [{
            descricao: 'Celular'
        },{
            descricao: 'Telefone'
        },{
            descricao: 'E-mail'
        }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('contato_tipos', null, {});
    }
};
