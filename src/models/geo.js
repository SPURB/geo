'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Geo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Mapa, {
        through: 'MapaGeos',
        as: 'mapas',
        foreignKey: 'GeoId'
      })
    }
  };
  Geo.init({
    features: DataTypes.GEOMETRY
  }, {
    sequelize,
    modelName: 'Geo',
  })
  return Geo
};