// 商品属性|详情表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 product_property 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('product_property', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      product_id: { type: INTEGER(11), allowNull: false, comment: '外键: 商品id, 关联product表' },
      name: { type: STRING(30), defaultValue: null, comment: '详情属性名称' },
      detail: { type: STRING(255), allowNull: false, comment: '详情属性' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 product_property 表
  down: async queryInterface => {
    await queryInterface.dropTable('product_property')
  }
}
