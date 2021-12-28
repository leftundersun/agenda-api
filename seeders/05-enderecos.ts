'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('enderecos', [{
            complemento: "Sala 195",
            numero: "471",
            bairro: "Centro",
            logradouro: "R. Osvaldo Aranha",
            cep: "95700000",
            cidade_id: 4649,
            pessoa_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        },{
            complemento: "Sala 195",
            numero: "471",
            bairro: "Centro",
            logradouro: "R. Osvaldo Aranha",
            cep: "95700000",
            cidade_id: 4649,
            pessoa_id: 2,
            created_at: new Date(),
            updated_at: new Date()
        }]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('enderecos', null, {});
    }
};
