// 商品类目表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 category 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('category', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      name: { type: STRING(50), allowNull: false, comment: '分类名称' },
      topic_img_id: { type: INTEGER(11), defaultValue: null, comment: '外键: 商品类目图片id, 关联image表' },
      description: { type: STRING(100), defaultValue: null, comment: '分类描述' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 category 表
  down: async queryInterface => {
    await queryInterface.dropTable('category')
  }
}
