'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('enderecos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bairro: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            logradouro: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            numero: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            complemento: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            cep: {
                type: Sequelize.STRING(8),
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            cidade_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'cidades',
                    key: 'id'
                }
            },
            pessoa_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'pessoas',
                    key: 'id'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('enderecos');
    }
};