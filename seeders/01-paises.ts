'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('paises', [{
            id: 1,
            nome: 'Brasil'
        }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('paises', null, {});
    }
};
