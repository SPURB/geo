'use strict';
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Mapa extends Model {
    static associate(models) {
      this.belongsToMany(models.Geo, {
        through: 'MapaGeos',
        as: 'geos',
        foreignKey: 'MapaId'
      })
    }
  }
  Mapa.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Mapa'
  })
  return Mapa
}