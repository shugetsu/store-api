const Service = require('egg').Service

class UserAddress extends Service {

  // 创建地址
  async createAddress(address) {
    const { ctx } = this;
    address.default = parseInt(address.default)
    if (address.default === 1) {
      const defaultAddress = await ctx.model.UserAddress.findOne({
        where: {
          user_id: address.user_id,
          default: 1
        }
      })
      if (defaultAddress) {
        const updateResult = await ctx.model.UserAddress.update({ default: 0 }, { where: { id: defaultAddress.id } })
        if (!updateResult) {
          ctx.throwException(ctx.ExceptionTypes.User.ADD_ADDERSS_ERROR)
        }
      }
    }
    const result = await ctx.model.UserAddress.create(address)
    return result
  }
  // 更新地址
  async updateAddress(address) {
    const { ctx } = this
    address.default = parseInt(address.default)
    const result = await ctx.model.UserAddress.update(address, { where: { id: address.id } })
    return result
  }
}

module.exports = UserAddress
