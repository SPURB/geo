'use strict';
const path = require('path')
const { polygons } = require(`${path.resolve(__dirname)}/../data`)

const now = new Date()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sequelizedPolygons = polygons.map(({id, coordinates}) => {
      const polygon = {
        type: 'MultiPolygon',
        coordinates
      }
      return {
        id,
        features: Sequelize.fn('ST_GeomFromGeoJSON', JSON.stringify(polygon)),
        createdAt: now,
        updatedAt: now
      }
    })
    try {
      await queryInterface.bulkInsert('Geo', sequelizedPolygons, {})
    }
    catch (err) {
      throw new Error(err)
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Geo', null, {})
  }
}
