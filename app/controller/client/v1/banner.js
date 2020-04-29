const Controller = require('egg').Controller
const valid = require('../../../utils/valid')

class BannerController extends Controller {
  /**
   * 获取幻灯片
   * @url /api/client/v1/banner/getBannerById
   * @method GET
   * @params id 轮播图id (1=首页顶部轮播图)
   */
  async getBannerById() {
    const { ctx } = this
    const { id } = await ctx.validate(ctx.query, {
      id: [{ validator: valid.empty() }, { validator: valid.integer() }]
    })
    const result = await ctx.service.banner.findByBannerId(id)
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.BANNER_HOME_TOP_NOT_FOUND)
    }
    ctx.successResponse(result)
  }
}

module.exports = BannerController
