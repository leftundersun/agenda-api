module.exports = function (sequelize: any, Sequelize: any) {
    return sequelize.define("contato", {
        valor: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    }, {
        underscored: true
    })
}