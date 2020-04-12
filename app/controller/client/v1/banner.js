const Controller = require('egg').Controller

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
      id: [{ required: true, message: 'id不能为空' }, { message: 'id必须是正整数', pattern: /^[0-9]+$/ }]
    })
    const result = await ctx.service.banner.findByBannerId(id)
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.BANNER_HOME_TOP_NOT_FOUND)
    }
    ctx.successResponse(result)
  }
}

module.exports = BannerController
