'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MapaGeos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MapaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Mapas',
          key: 'id',
          onDelete: 'CASCADE',
          allowNull: false
        }
      },
      GeoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Geos',
          key: 'id',
          onDelete: 'CASCADE',
          allowNull: false
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MapaGeos')
  }
}
