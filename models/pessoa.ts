module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define("pessoa", {
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
        }
    }, {
        underscored: true
    })
}