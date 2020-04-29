const Controller = require('egg').Controller
const valid = require('../../../utils/valid')

class ThemeController extends Controller {

  /**
   * 获取专题列表
   * @url /api/client/v1/theme/getThemeList
   * @method GET
   */
  async getThemeList() {
    const { ctx } = this
    const result = await ctx.service.theme.findThemeList()
    ctx.successResponse(result)
  }

  /**
   * 获取专题详情
   * @url /api/client/v1/theme/getThemeDetail
   * @method GET
   * @params id 专题id
   */
  async getThemeDetail() {
    const { ctx } = this
    const { id } = await ctx.validate(ctx.query, {
      id: [{ validator: valid.required() }, { validator: valid.integer() }]
    })
    const result = await ctx.service.theme.findThemeDetail(id)
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.THEME_NOT_FOUND)
    }
    ctx.successResponse(result)
  }
}

module.exports = ThemeController
