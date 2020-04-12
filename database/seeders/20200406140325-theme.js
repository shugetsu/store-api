module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('theme', [
      { id: 1, name: '专题栏位一', description: '美味水果世界', topic_img_id: 16, head_img_id: 49, created_at: new Date(), updated_at: new Date() },
      { id: 2, name: '专题栏位二', description: '新品推荐', topic_img_id: 17, head_img_id: 50, created_at: new Date(), updated_at: new Date() },
      { id: 3, name: '专题栏位三', description: '做个干物女', topic_img_id: 18, head_img_id: 18, created_at: new Date(), updated_at: new Date() }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('theme', null, {})
  }
}
