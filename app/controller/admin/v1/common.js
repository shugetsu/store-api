const Controller = require('egg').Controller
const valid = require('../../../utils/valid')

class CommonController extends Controller {

  /**
   * 验证码
   * @url /api/admin/v1/common/captcha
   * @params width 宽度 80
   * @params height 高度 40
   */
  async captcha() {
    const { ctx } = this
    const { width, height } = await ctx.validate(ctx.query, {
      width: { validator: valid.integer() },
      height: { validator: valid.integer() }
    })
    const result = await ctx.helper.createCaptcha(width, height)
    ctx.response.type = 'svg'
    ctx.body = result.data
  }
}

module.exports = CommonController
