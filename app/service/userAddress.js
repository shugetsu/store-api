const Service = require('egg').Service

class UserAddress extends Service {

  // 根据地址id查找
  async findByAddressId(addressId) {
    const { ctx } = this
    const address = await ctx.model.UserAddress.findByPk(addressId)
    if (!address) {
      ctx.throwException(ctx.ExceptionTypes.NOT_FOUND_USER_ADDRESS_ERROR)
    }
    return address
  }

  // 根据用户id查找地址
  async findAddressByUserId(userId) {
    const { ctx } = this
    const result = await ctx.model.UserAddress.findOne({
      attributes: { exclude: ['deletedAt'] },
      where: { user_id: userId }
    })
    return result
  }

  // 创建地址
  async createAddress(address) {
    const { ctx } = this
    const isExist = await this.findAddressByUserId(address.userId)
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
