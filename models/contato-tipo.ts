module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define("contatoTipo", {
        descricao: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false,
        underscored: true
    })
}