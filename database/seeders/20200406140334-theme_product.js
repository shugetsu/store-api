module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('theme_product', [
      { theme_id: 1, product_id: 2 },
      { theme_id: 1, product_id: 5 },
      { theme_id: 1, product_id: 8 },
      { theme_id: 1, product_id: 10 },
      { theme_id: 1, product_id: 12 },
      { theme_id: 2, product_id: 1 },
      { theme_id: 2, product_id: 2 },
      { theme_id: 2, product_id: 3 },
      { theme_id: 2, product_id: 5 },
      { theme_id: 2, product_id: 6 },
      { theme_id: 2, product_id: 16 },
      { theme_id: 2, product_id: 33 },
      { theme_id: 3, product_id: 15 },
      { theme_id: 3, product_id: 18 },
      { theme_id: 3, product_id: 19 },
      { theme_id: 3, product_id: 27 },
      { theme_id: 3, product_id: 30 },
      { theme_id: 3, product_id: 31 }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('theme_product', null, {})
  }
}
