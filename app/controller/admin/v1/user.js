const Controller = require('egg').Controller
const valid = require('../../../utils/valid')

class UserController extends Controller {

  /**
   * 用户登录
   * @url /api/admin/v1/user/login
   * @params user
   */

  async login() {
    const { ctx } = this
    const { userName, password, captcha } = await ctx.validate(ctx.request.body, {
      userName: { validator: valid.required() },
      password: { validator: valid.required() },
      captcha: { validator: valid.required() }
    })
    if (!ctx.helper.checkCaptcha(captcha)) {
      ctx.throwException(ctx.ExceptionTypes.CAPTCHA_ERROR)
    }
    const result = await ctx.service.appToken.getToken(userName, password)
    ctx.successResponse(result)
  }
}

module.exports = UserController
