const Controller = require('egg').Controller

class AddressController extends Controller {

  /**
   * 获取用户地址
   * @url /api/client/v1/userAddress/getUserAddress
   * @method GET
   * @header token
   */
  async getUserAddress() {
    const { ctx } = this
    const token = ctx.header.token
    const userId = ctx.helper.getUserId(token)
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
    const token = ctx.header.token
    const userId = ctx.helper.getUserId(token)
    const { name, mobile, province, city, country, detail } = await ctx.validate(ctx.request.body, {
      name: [{ required: true, message: 'name不能为空' }],
      mobile: [{ required: true, message: 'mobile不能为空' }],
      province: [{ required: true, message: 'province不能为空' }],
      city: [{ required: true, message: 'city不能为空' }],
      country: [{ required: true, message: 'country不能为空' }],
      detail: [{ required: true, message: 'detail不能为空' }]
    })
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
    const token = ctx.header.token
    const userId = ctx.helper.getUserId(token)
    const { id, name, mobile, province, city, country, detail } = await ctx.validate(ctx.request.body, {
      id: [{ required: true, message: 'id不能为空' }, { message: 'id必须是正整数', pattern: /^[0-9]+$/ }],
      name: [{ required: true, message: 'name不能为空' }],
      mobile: [{ required: true, message: 'mobile不能为空' }],
      province: [{ required: true, message: 'province不能为空' }],
      city: [{ required: true, message: 'city不能为空' }],
      country: [{ required: true, message: 'country不能为空' }],
      detail: [{ required: true, message: 'detail不能为空' }]
    })
    const result = await ctx.service.userAddress.updateUserAddress({ id, name, mobile, province, city, country, detail, userId })
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.UPDATE_ADDERSS_ERROR)
    }
    ctx.successResponse(result)
  }
}

module.exports = AddressController
