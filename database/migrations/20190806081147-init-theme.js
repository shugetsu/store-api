// 专题表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 theme 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('theme', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      name: { type: STRING(50), allowNull: false, comment: '专题名称' },
      description: { type: STRING(255), defaultValue: null, comment: '专题描述' },
      topic_img_id: { type: INTEGER(11), allowNull: false, comment: '外键: 主题图id, 关联image表' },
      head_img_id: { type: INTEGER(11), allowNull: false, comment: '外键: 专题列表页的头图id, 关联image表' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 theme 表
  down: async queryInterface => {
    await queryInterface.dropTable('theme')
  }
}
