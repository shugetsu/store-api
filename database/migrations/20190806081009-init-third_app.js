// 访问API的各应用账号密码表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 third_app 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('third_app', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      app_id: { type: STRING(64), allowNull: false, comment: '应用app_id' },
      app_secret: { type: STRING(64), allowNull: false, comment: '应用app_secret' },
      app_description: { type: STRING(100), defaultValue: null, comment: '应用程序的描述' },
      scope: { type: STRING(20), allowNull: false, comment: '应用权限' },
      scope_description: { type: STRING(100), defaultValue: null, comment: '权限描述' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 third_app 表
  down: async queryInterface => {
    await queryInterface.dropTable('third_app')
  }
}
