module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('banner_item', [
      { id: 1, img_id: 65, banner_id: 1, key_word: '6', type: 1, created_at: new Date(), updated_at: new Date() },
      { id: 2, img_id: 2, banner_id: 1, key_word: '25', type: 1, created_at: new Date(), updated_at: new Date() },
      { id: 3, img_id: 3, banner_id: 1, key_word: '11', type: 1, created_at: new Date(), updated_at: new Date() },
      { id: 4, img_id: 1, banner_id: 1, key_word: '10', type: 1, created_at: new Date(), updated_at: new Date() }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('banner_item', null, {})
  }
}
