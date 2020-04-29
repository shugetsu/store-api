const Controller = require('egg').Controller
const valid = require('../../../utils/valid')

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
      count: [{ validator: valid.required() }, { validator: valid.integer() }]
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
      id: [{ validator: valid.required() }, { validator: valid.integer() }]
    })
    const result = await ctx.service.product.findProductDetail(id)
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.PRODUCT_NOT_FOUND)
    }
    ctx.successResponse(result)
  }
}

module.exports = ProductController
