// 用户收货地址表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 user_address 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BOOLEAN } = Sequelize
    await queryInterface.createTable('user_address', {
      id: { type: INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: true },
      user_id: { type: INTEGER(11), allowNull: false, comment: '外键: 用户id, 关联user表' },
      name: { type: STRING(30), allowNull: false, comment: '收货人姓名' },
      mobile: { type: STRING(20), allowNull: false, comment: '手机号码' },
      province: { type: STRING(20), allowNull: false, comment: '省' },
      city: { type: STRING(20), allowNull: false, comment: '市' },
      country: { type: STRING(20), allowNull: false, comment: '区' },
      detail: { type: STRING(100), allowNull: false, comment: '详细地址' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 user_address 表
  down: async queryInterface => {
    await queryInterface.dropTable('user_address')
  }
}
