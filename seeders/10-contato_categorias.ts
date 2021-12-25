'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('contato_categorias', [{
            descricao: 'Pessoal'
        },{
            descricao: 'Trabalho'
        }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('contato_categorias', null, {});
    }
};
