module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Mapas', [
      {
        nome: 'Operação Urbana Consorciada Faria Lima',
        descricao: 'Mapa de adesões da OUCFL',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Mapas', null, {})
  }
}