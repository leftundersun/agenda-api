'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('contatos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            valor: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            publico: {
                type: Sequelize.BOOLEAN,
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
            pessoa_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'pessoas',
                    key: 'id'
                }
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            contato_tipo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'contato_tipos',
                    key: 'id'
                }
            },
            contato_categoria_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'contato_categorias',
                    key: 'id'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('contatos');
    }
};