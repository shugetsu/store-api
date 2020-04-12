// 用户表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 user 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: true },
      unionid: { type: STRING(50), unique: true, allowNull: false, comment: 'unionid' },
      nickname: { type: STRING(50), defaultValue: null, comment: '昵称' },
      extend: { type: STRING(255), defaultValue: null, comment: '扩展' },
      delete_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null },
    });
  },
  // 在执行数据库降级时调用的函数，删除 user 表
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
