module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tokens', [
      {
        token: '4a2cd8360eca220ca02466bdab79086a658359ab6ea87df25b6ca99d63a13126',
        valid: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tokens', null, {})
  }
}
