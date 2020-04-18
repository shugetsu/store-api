const Controller = require('egg').Controller

class TokenController extends Controller {

  /**
   * 获取Token令牌
   * @url /api/client/v1/token/getToken
   * @params code 微信code
   */

  async getToken() {
    const { ctx } = this
    const { code } = await ctx.validate(ctx.request.query, { code: { required: true, message: 'code不能为空' } })
    const result = await ctx.service.token.getToken(code)
    ctx.successResponse(result)
  }
}

module.exports = TokenController
