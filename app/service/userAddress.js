const Service = require('egg').Service

class UserAddress extends Service {

  async findUserAddress(userId) {
    const { ctx } = this
    const result = await ctx.model.UserAddress.findOne({
      where: { user_id: userId }
    })
    return result
  }

  // 创建地址
  async createAddress(address) {
    const { ctx } = this
    const isExist = await this.findUserAddress(address.userId)
    if (isExist) {
      ctx.throwException(ctx.ExceptionTypes.USER_ADDERSS_IS_EXIST)
    }
    const result = await ctx.model.UserAddress.create(address)
    return result
  }
  // 更新用户地址
  async updateUserAddress(address) {
    const { ctx } = this
    const result = await ctx.model.UserAddress.update(address, { where: { id: address.id } })
    return result
  }
}

module.exports = UserAddress
