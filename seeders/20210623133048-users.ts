'use strict';
var bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      username: 'root',
      password: bcrypt.hashSync('123', 10),
      pessoa_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },{
      id: 2,
      username: 'user',
      password: bcrypt.hashSync('123', 10),
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
