
// 幻灯片子项表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 banner_item 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('banner_item', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      img_id: { type: INTEGER(11), allowNull: false, comment: '外键: 图片id, 关联image表' },
      banner_id: { type: INTEGER(11), allowNull: false, comment: '外键: 幻灯片id, 关联banner表' },
      key_word: { type: STRING(100), allowNull: false, comment: '执行关键字: 根据不同的type含义不同' },
      type: { type: INTEGER(4), allowNull: false, defaultValue: 1, comment: '跳转类型: 可能导向商品, 可能导向专题, 可能导向其他。0=无导向, 1=导向商品, 2=导向专题' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 banner_item 表
  down: async queryInterface => {
    await queryInterface.dropTable('banner_item')
  }
}
