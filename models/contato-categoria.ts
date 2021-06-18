module.exports = function (sequelize: any, Sequelize: any) {
    return sequelize.define("contatoCategoria", {
        descricao: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'contato_categorias',
        timestamps: false,
        underscored: true
    })
}