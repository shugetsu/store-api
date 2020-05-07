const Controller = require('egg').Controller
const valid = require('../../../utils/valid')

class TokenController extends Controller {

  /**
   * 获取Token令牌
   * @url /api/client/v1/token/getToken
   * @params code 微信code
   */

  async getToken() {
    const { ctx } = this
    const { code } = await ctx.validate(ctx.request.query, { code: { validator: valid.required() } })
    const result = await ctx.service.token.getToken(code)
    ctx.successResponse(result)
  }
}

module.exports = TokenController
