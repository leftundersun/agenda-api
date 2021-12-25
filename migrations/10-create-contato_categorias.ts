'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('contato_categorias', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            descricao: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('contato_categorias');
    }
};