'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user_roles', [{
            user_id: 1,
            role_id: 1,
            created_at: new Date(),
            updated_at: new Date()
        },{
            user_id: 1,
            role_id: 2,
            created_at: new Date(),
            updated_at: new Date()
        },{
            user_id: 2,
            role_id: 2,
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
