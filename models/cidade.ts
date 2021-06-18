module.exports = function (sequelize: any, Sequelize: any) {
    return sequelize.define("cidade", {
        nome: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true
    })
}