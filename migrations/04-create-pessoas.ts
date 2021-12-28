'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('pessoas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nome: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            cpf: {
                type: Sequelize.STRING(11),
                allowNull: false,
                unique: true
            },
            data_nascimento: {
                type: Sequelize.DATE,
                allowNull: false
            },
            foto: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('pessoas');
    }
};