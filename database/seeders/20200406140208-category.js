module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('category', [
      { id: 2, name: '果味', topic_img_id: 6, description: '', created_at: new Date(), updated_at: new Date() },
      { id: 3, name: '蔬菜', topic_img_id: 5, description: '', created_at: new Date(), updated_at: new Date() },
      { id: 4, name: '炒货', topic_img_id: 7, description: '', created_at: new Date(), updated_at: new Date() },
      { id: 5, name: '点心', topic_img_id: 4, description: '', created_at: new Date(), updated_at: new Date() },
      { id: 6, name: '粗茶', topic_img_id: 8, description: '', created_at: new Date(), updated_at: new Date() },
      { id: 7, name: '淡饭', topic_img_id: 9, description: '', created_at: new Date(), updated_at: new Date() }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('category', null, {})
  }
}
