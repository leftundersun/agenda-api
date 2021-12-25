'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [{
            descricao: 'admin'
        },{
            descricao: 'user'
        }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {});
    }
};
