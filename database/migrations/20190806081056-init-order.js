// 订单表
module.exports = {
  // 在执行数据库升级时调用的函数，创建 order 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, DECIMAL, TEXT } = Sequelize
    await queryInterface.createTable('order', {
      id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
      order_no: { type: STRING(20), unique: true, allowNull: false, comment: '订单号' },
      user_id: { type: INTEGER(11), key: true, allowNull: false, comment: '外键: 用户id(注意并不是openid), 关联user表' },
      prepay_id: { type: STRING(100), defaultValue: null, comment: '订单微信支付的预订单id(用于发送模板消息)' },
      total_price: { type: DECIMAL(6, 2), allowNull: false, comment: '总价' },
      total_count: { type: INTEGER(11), allowNull: false, defaultValue: 0, comment: '总数' },
      snap_name: { type: STRING(80), defaultValue: null, comment: '订单快照名称' },
      snap_specification: { type: STRING(45), defaultValue: null, comment: '订单快照规格' },
      snap_img: { type: STRING(255), defaultValue: null, comment: '订单快照图片' },
      snap_address: { type: STRING(500), defaultValue: null, comment: '地址快照' },
      snap_items: { type: TEXT, defaultValue: null, comment: '订单其他信息快照(json)' },
      status: { type: INTEGER(4), allowNull: false, defaultValue: 1, comment: '订单状态：1=未支付, 2=已支付, 3=已发货, 4=已支付, 但库存不足' },
      deleted_at: { type: DATE, defaultValue: null },
      created_at: { type: DATE, defaultValue: null },
      updated_at: { type: DATE, defaultValue: null }
    })
  },
  // 在执行数据库降级时调用的函数，删除 order 表
  down: async queryInterface => {
    await queryInterface.dropTable('order')
  }
}
