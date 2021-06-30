module.exports = function (sequelize: any, Sequelize: any) {
    return sequelize.define("endereco", {
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
        }
    }, {
        underscored: true
    })
}