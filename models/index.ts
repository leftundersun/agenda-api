'use strict';
const fs = require('fs');
var path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.ts')[env];
var db: any = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.pais.hasMany(db.estado, { foreignKey: 'pais_id' })
db.estado.belongsTo(db.pais, { foreignKey: 'pais_id' })

db.estado.hasMany(db.cidade, { foreignKey: 'estado_id' })
db.cidade.belongsTo(db.estado, { foreignKey: 'estado_id' })

db.cidade.hasMany(db.endereco, { foreignKey: 'cidade_id' })
db.endereco.belongsTo(db.cidade, { foreignKey: 'cidade_id' })

db.pessoa.hasOne(db.endereco, { foreignKey: 'pessoa_id' })
db.endereco.belongsTo(db.pessoa, { foreignKey: 'pessoa_id' })

db.pessoa.hasOne(db.user, { foreignKey: 'pessoa_id' })
db.user.belongsTo(db.pessoa, { foreignKey: 'pessoa_id', as: 'pessoa' })

db.pessoa.hasMany(db.contato, { foreignKey: 'pessoa_id' })
db.contato.belongsTo(db.pessoa, { foreignKey: 'pessoa_id' })

db.user.hasMany(db.contato, { foreignKey: 'user_id' })
db.contato.belongsTo(db.user, { foreignKey: 'user_id' })

db.contatoTipo.hasMany(db.contato, { foreignKey: 'contato_tipo_id' })
db.contato.belongsTo(db.contatoTipo, { foreignKey: 'contato_tipo_id' })

db.contatoCategoria.hasMany(db.contato, { foreignKey: 'contato_categoria_id' })
db.contato.belongsTo(db.contatoCategoria, { foreignKey: 'contato_categoria_id', as: 'contatoCategoria' })

db.user.belongsToMany(db.role, { through: 'user_roles' })
db.role.belongsToMany(db.user, { through: 'user_roles' })

db.user.belongsToMany(db.pessoa, { through: 'user_contato_favorito', as: 'favoritos' })
db.pessoa.belongsToMany(db.user, { through: 'user_contato_favorito', as: 'favoritos' })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
