'use strict';
const path = require('path')
const { polygons } = require(`${path.resolve(__dirname)}/../data`)

const now = new Date()
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const geoIds = polygons.map(({ id }) => {
      return {
        MapaId: 1,
        GeoId: id,
        createdAt: now,
        updatedAt: now
      }
    })
    try {
      await queryInterface.bulkInsert('MapaGeos', geoIds, {})
    }
    catch (err) {
      throw new Error(err)
    }
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MapaGeos', null, {})
  }
}
