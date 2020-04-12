const Controller = require('egg').Controller

class AddressController extends Controller {

  async addAddress() {
    const { ctx } = this
    // const validResult = await ctx.validate(ctx.request.body, {
    //   name: [{ required: true, message: 'name不能为空' }],
    //   mobile: [{ required: true, message: 'mobile不能为空' }],
    //   province: [{ required: true, message: 'province不能为空' }],
    //   city: [{ required: true, message: 'city不能为空' }],
    //   default: [{ type: 'enum', enum: [ 0, 1, '0', '1' ], message: 'default必须是0或1' }],
    //   country: [{ required: true, message: 'country不能为空' }],
    //   detail: [{ required: true, message: 'detail' }]
    // })

    // const user_id = ctx.helper.getTokenContent(ctx.header.token).uid
    // const user = ctx.service.user.findUser(user_id)

    // if (!user) {
    //   ctx.throwException(ctx.ExceptionTypes.User.NOT_FOUND_USER)
    // }
    // const result = await ctx.service.address.createAddress({ ...validResult, user_id })
    // if (!result) {
    //   ctx.throwException(ctx.ExceptionTypes.User.ADD_ADDERSS_ERROR)
    // }
    // ctx.successResponse(result)
  }

  async updateAddress() {
    // const { ctx } = this
    // const validResult = await ctx.validate(AddressRules.update, ctx.request.body)
    // const user_id = ctx.helper.getTokenContent(ctx.header.token).uid
    // const result = await ctx.service.address.updateAddress({ ...validResult, user_id })
    // if (!result) {
    //   ctx.throwException(ctx.ExceptionTypes.User.UPDATE_ADDERSS_ERROR)
    // }
    // ctx.successResponse({ msg: '更新成功' })
  }
}

module.exports = AddressController
