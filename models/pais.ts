module.exports = function (sequelize: any, Sequelize: any) {
    return sequelize.define("pais", {
        nome: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'paises',
        timestamps: false,
        underscored: true
    })
}