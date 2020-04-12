module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_image', [
      { id: 4, img_id: 19, product_id: 11, order: 1, created_at: new Date(), updated_at: new Date() },
      { id: 5, img_id: 20, product_id: 11, order: 2, created_at: new Date(), updated_at: new Date() },
      { id: 6, img_id: 21, product_id: 11, order: 3, created_at: new Date(), updated_at: new Date() },
      { id: 7, img_id: 22, product_id: 11, order: 4, created_at: new Date(), updated_at: new Date() },
      { id: 8, img_id: 23, product_id: 11, order: 5, created_at: new Date(), updated_at: new Date() },
      { id: 9, img_id: 24, product_id: 11, order: 6, created_at: new Date(), updated_at: new Date() },
      { id: 10, img_id: 25, product_id: 11, order: 7, created_at: new Date(), updated_at: new Date() },
      { id: 11, img_id: 26, product_id: 11, order: 8, created_at: new Date(), updated_at: new Date() },
      { id: 12, img_id: 27, product_id: 11, order: 9, created_at: new Date(), updated_at: new Date() },
      { id: 13, img_id: 28, product_id: 11, order: 10, created_at: new Date(), updated_at: new Date() },
      { id: 14, img_id: 29, product_id: 11, order: 11, created_at: new Date(), updated_at: new Date() },
      { id: 18, img_id: 62, product_id: 11, order: 12, created_at: new Date(), updated_at: new Date() },
      { id: 19, img_id: 63, product_id: 11, order: 13, created_at: new Date(), updated_at: new Date() }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_image', null, {})
  }
}
