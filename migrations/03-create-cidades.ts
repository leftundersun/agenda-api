'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cidades', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nome: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            estado_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'estados',
                    key: 'id'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cidades');
    }
};