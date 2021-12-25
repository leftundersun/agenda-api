module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define("contatoCategoria", {
        descricao: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'contato_categorias',
        timestamps: false,
        underscored: true
    })
}