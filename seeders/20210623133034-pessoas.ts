'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pessoas', [{
      id: 1,
      nome: 'Admin',
      cpf: '11111111111',
      data_nascimento: new Date(),
      foto: '',
      created_at: new Date(),
      updated_at: new Date()
    },{
      id: 2,
      nome: 'User',
      cpf: '22222222222',
      data_nascimento: new Date(),
      foto: '',
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
