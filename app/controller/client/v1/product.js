const Controller = require('egg').Controller

class ProductController extends Controller {

  /**
   * 获取新品列表
   * @url /api/client/v1/product/getNewProductList
   * @method GET
   * @params count 获取的数量
   */
  async getNewProductList() {
    const { ctx } = this
    const { count } = await ctx.validate(ctx.query, {
      count: [{ required: true, message: 'count不能为空' }, { message: 'count必须是正整数', pattern: /^[0-9]+$/ }]
    })
    const result = await ctx.service.product.findNewProductList(count)
    ctx.successResponse(result)
  }

  /**
   * 获取商品详情
   * @url /api/client/v1/product/getProductDetail
   * @method GET
   * @params id 商品id
   */
  async getProductDetail() {
    const { ctx } = this
    const { id } = await ctx.validate(ctx.query, {
      id: [{ required: true, message: 'id不能为空' }, { message: 'id必须是正整数', pattern: /^[0-9]+$/ }]
    })
    const result = await ctx.service.product.findProductDetail(id)
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.PRODUCT_NOT_FOUND)
    }
    ctx.successResponse(result)
  }
}

module.exports = ProductController
