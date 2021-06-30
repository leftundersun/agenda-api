'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('enderecos', [{
            bairro: 'Centro',
            logradouro: 'R. Saldanha Marinho',
            numero: '570',
            complemento: 'Sala 404',
            cep: '95700082',
            cidade_id: 4649,
            pessoa_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        },{
            bairro: 'Centro',
            logradouro: 'R. Saldanha Marinho',
            numero: '570',
            complemento: 'Sala 404',
            cep: '95700082',
            cidade_id: 4649,
            pessoa_id: 2,
            created_at: new Date(),
            updated_at: new Date()
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
