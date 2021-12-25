'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_roles', {
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            user_id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            role_id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('user_roles');
    }
};