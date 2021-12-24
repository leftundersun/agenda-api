module.exports = (sequelize: any, Sequelize: any) => {
    return sequelize.define("user", {
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(60),
            allowNull: false
        }
    }, {
        underscored: true
    })
}