module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define("contato", {
        valor: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        publico: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        underscored: true
    })
}