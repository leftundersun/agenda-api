module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define("estado", {
        nome: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        uf: {
            type: Sequelize.STRING(2),
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true
    })
}