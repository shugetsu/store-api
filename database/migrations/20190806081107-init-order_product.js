// 订单商品表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 order_product 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize
    await queryInterface.createTable('order_product', {
      order_id: { type: INTEGER(11), primaryKey: true, comment: '联合主键: 订单id, 关联order表' },
      product_id: { type: INTEGER(11), primaryKey: true, comment: '联合主键: 商品id, 关联product表' },
      count: { type: INTEGER(11), allowNull: false, comment: '商品的数量' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 order_product 表
  down: async queryInterface => {
    await queryInterface.dropTable('order_product')
  }
}
