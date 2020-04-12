module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('banner', [
      { id: 1, name: '首页置顶', description: '首页幻灯片位', created_at: new Date(), updated_at: new Date() }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('banner', null, {})
  }
}
