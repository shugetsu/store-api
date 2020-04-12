
// 图片总表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 image 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('image', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      url: { type: STRING(255), allowNull: false, comment: '图片路径' },
      from: { type: INTEGER(4), allowNull: false, defaultValue: 1, comment: '图片来源: 1=来自本地, 2=来自公网' },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null },
      deleted_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 image 表
  down: async queryInterface => {
    await queryInterface.dropTable('image')
  }
}
