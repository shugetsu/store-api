// 主题所包含的商品表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 theme_product 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize
    await queryInterface.createTable('theme_product', {
      theme_id: { type: INTEGER(11), primaryKey: true, comment: '外键: 专题id, 关联theme表' },
      product_id: { type: INTEGER(11), primaryKey: true, comment: '外键: 商品id, 关联product表' }
    })
  },
  // 在执行数据库降级时调用的函数，删除 theme_product 表
  down: async queryInterface => {
    await queryInterface.dropTable('theme_product')
  }
}
