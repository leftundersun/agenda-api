'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('estados', {
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
            uf: {
                type: Sequelize.STRING(2),
                allowNull: false
            },
            pais_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'paises',
                    key: 'id'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('estados');
    }
};