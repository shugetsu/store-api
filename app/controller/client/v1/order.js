const Controller = require('egg').Controller
const orderRules = require('../../../utils/order_rules')
const pagingRules = require('../../../utils/paging_rules')

class OrderController extends Controller {

  /**
   * 下单
   * @url /api/client/v1/order/placeOrder
   * @method POST
   * @header token
   */
  async placeOrder() {
    const { ctx } = this
    const { addressId, products } = await ctx.validate(ctx.request.body, orderRules)
    const userId = ctx.helper.getUserId()
    const result = await ctx.service.order.placeOrder(userId, addressId, products)
    ctx.successResponse(result)
  }
  /**
   * 获取订单列表
   * @url /api/client/v1/order/getOrderList
   * @method GET
   * @header token
   * @params page
   * @params size
   */
  async getOrderList() {
    const { ctx } = this
    const { page, size } = await ctx.validate(ctx.request.query, pagingRules)
    const userId = ctx.helper.getUserId()
    const result = await ctx.service.order.findOrderList(userId, parseInt(page), parseInt(size))
    ctx.successResponse(result)
  }
}

module.exports = OrderController;
