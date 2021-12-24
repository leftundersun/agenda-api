module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define("role", {
        descricao: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true
    })
}