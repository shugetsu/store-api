// 幻灯片管理表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 banner 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('banner', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      name: { type: STRING(50), defaultValue: null, comment: '幻灯片名称' },
      description: { type: STRING(255), defaultValue: null, comment: '幻灯片描述' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 banner 表
  down: async queryInterface => {
    await queryInterface.dropTable('banner')
  }
}
