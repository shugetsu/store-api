// 商品图片表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 product_image 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('product_image', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      img_id: { type: INTEGER(11), allowNull: false, comment: '外键, 商品图id, 关联image表' },
      product_id: { type: INTEGER(11), allowNull: false, comment: '外键, 商品id, 关联product表' },
      order: { type: INTEGER(11), allowNull: false, defaultValue: 0, comment: '图片排序序号' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 product_image 表
  down: async queryInterface => {
    await queryInterface.dropTable('product_image')
  }
}
