module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_property', [
      { id: 2, product_id: 11, name: '口味', detail: '青梅味 雪梨味 黄桃味 菠萝味', created_at: new Date(), updated_at: new Date() },
      { id: 3, product_id: 11, name: '产地', detail: '火星', created_at: new Date(), updated_at: new Date() },
      { id: 4, product_id: 11, name: '保质期', detail: '180天', created_at: new Date(), updated_at: new Date() },
      { id: 5, product_id: 2, name: '品名', detail: '梨子', created_at: new Date(), updated_at: new Date() },
      { id: 6, product_id: 2, name: '产地', detail: '金星', created_at: new Date(), updated_at: new Date() },
      { id: 7, product_id: 2, name: '净含量', detail: '100g', created_at: new Date(), updated_at: new Date() },
      { id: 8, product_id: 2, name: '质期', detail: '10天', created_at: new Date(), updated_at: new Date() }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_property', null, {})
  }
}
