// 商品表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 product 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, DECIMAL, BOOLEAN } = Sequelize
    await queryInterface.createTable('product', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      name: { type: STRING(80), allowNull: false, comment: '商品名称' },
      price: { type: DECIMAL(6, 2), allowNull: false, comment: '价格 (单位：分)' },
      stock: { type: INTEGER(11), allowNull: false, defaultValue: 0, comment: '库存量' },
      category_id: { type: INTEGER(11), defaultValue: null, comment: '外键: 商品分类id, 关联category表' },
      summary: { type: STRING(50), defaultValue: null, comment: '摘要' },
      main_img_url: { type: STRING(255), defaultValue: null, comment: '主图url, 这是一个反范式设计, 有一定的冗余' },
      from: { type: INTEGER(4), allowNull: false, defaultValue: 1, comment: '图片来源：1=来自本地, 2=来自公网' },
      img_id: { type: INTEGER(11), defaultValue: null, comment: '外键: 商品图片id, 关联product_image表' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 product 表
  down: async queryInterface => {
    await queryInterface.dropTable('product')
  }
}

