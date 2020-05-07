const Controller = require('egg').Controller

class ThemeController extends Controller {

  /**
   * 获取商品分类列表
   * @url /api/client/v1/category/getProductCategoryList
   * @method GET
   */
  async getProductCategoryList() {
    const { ctx } = this
    const result = await ctx.service.category.findProductCategoryList()
    ctx.successResponse(result)
  }
}

module.exports = ThemeController;
