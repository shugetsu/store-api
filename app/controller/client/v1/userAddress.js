const Controller = require('egg').Controller
const userAddressRules = require('../../../utils/user_address_rules')

class UserAddressController extends Controller {

  /**
   * 获取用户地址
   * @url /api/client/v1/userAddress/getUserAddress
   * @method GET
   * @header token
   */
  async getUserAddress() {
    const { ctx } = this
    const userId = ctx.helper.getUserId()
    const result = await ctx.service.userAddress.findUserAddress(userId)
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.USER_ADDERSS_NOT_FOUND)
    }
    ctx.successResponse(result)
  }

  /**
   * 添加用户地址
   * @url /api/client/v1/userAddress/addUserAddress
   * @method POST
   * @header token
   */
  async addUserAddress() {
    const { ctx } = this
    const userId = ctx.helper.getUserId()
    const { name, mobile, province, city, country, detail } = await ctx.validate(ctx.request.body, userAddressRules.create)
    const result = await ctx.service.userAddress.createAddress({ name, mobile, province, city, country, detail, userId })
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.ADD_ADDERSS_ERROR)
    }
    ctx.successResponse(result)
  }

  /**
   * 更新用户地址
   * @url /api/client/v1/userAddress/updateUserAddress
   * @method POST
   * @header token
   */
  async updateUserAddress() {
    const { ctx } = this
    const userId = ctx.helper.getUserId()
    const { id, name, mobile, province, city, country, detail } = await ctx.validate(ctx.request.body, userAddressRules.update)
    const result = await ctx.service.userAddress.updateUserAddress({ id, name, mobile, province, city, country, detail, userId })
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.UPDATE_ADDERSS_ERROR)
    }
    ctx.successResponse(result)
  }
}

module.exports = UserAddressController
