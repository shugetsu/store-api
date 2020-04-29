
const Service = require('egg').Service

class Order extends Service {
  // 下单
  async placeOrder(userId, addressId, oProducts) {
    const { ctx } = this
    const products = await this._getProductsByOrder(oProducts)
    const status = await this._getOrderStatus(products, oProducts)
    // 1.检查订单中的商品是否存在
    if (status.noProductsIds.length) {
      let msg = '下单失败，订单中id为' + status.noProductsIds.join('、')
      if (status.noProductsIds.length > 1) {
        msg += '等'
      }
      msg += '商品不存在，可能已被删除'
      ctx.throwException(ctx.ExceptionTypes.NOT_FOUND_PRODUCT, { msg })
    }

    // 2.检查订单中的商品是否有库存
    if (status.noPassProductsNames.length) {
      let msg = '下单失败, 订单中' + status.noPassProductsNames.join('、')
      if (status.noPassProductsNames.length > 1) {
        msg += '等'
      }
      msg += '商品, 库存量不足'
      ctx.throwException(ctx.ExceptionTypes.PRODUCT_STOCK_INSUFFICIENT, { msg })
    }

    // 3.所有的商品的库存量是否足够
    if (!status.pass) {
      // 那些商品库存不足
      ctx.throwException(ctx.ExceptionTypes.PRODUCT_STOCK_INSUFFICIENT, { msg: status.noPassProductsStatus })
    }
    // 4.创建订单
    const snapOrder = await this._getSnapOrder(addressId, status, products)
    const order = await this._createOrder(userId, oProducts, snapOrder)
    return order
  }

  // 查询订单列表
  async findOrderList(userId, page, size) {
    const { ctx } = this
    const data = await ctx.model.Order.findAndCountAll({
      attributes: { exclude: ['deletedAt'] },
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
      offset: (page - 1) * size,
      limit: size,
      distinct: true,
      include: {
        attributes: { exclude: ['deletedAt'] },
        model: ctx.model.Product
      }
    })
    return data
  }

  // 获取订单的真实商品
  async _getProductsByOrder(oProducts) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const productIds = []
    for (let i = 0; i < oProducts.length; i++) {
      productIds.push(oProducts[i].productId)
    }
    const products = await ctx.model.Product.findAll({
      where: {
        id: {
          [Op.or]: productIds
        }
      }
    })
    return products
  }

  // 获取订单的状态(库存量，订单总价格等...)
  async _getOrderStatus(products, oProducts) {
    const status = {
      pass: true, // 所有商品是否有库存
      orderPrice: 0, // 所有商品的总价格
      totalCount: 0, // 所有商品的总数量
      productsStatus: [], // 存放所有商品状态
      noPassProductsNames: [], // 存放库存量不足的商品名
      noProductsIds: [] // 存放没的有商品ids
    }

    for (let i = 0; i < oProducts.length; i++) {
      const oId = oProducts[i].productId
      const oCount = oProducts[i].count
      const productStatus = await this._getProductStatus(oId, oCount, products)
      if (!productStatus.haveStock) {
        status.pass = false
        status.noPassProductsNames.push(productStatus.name)
      }
      if (!productStatus.haveProduct) {
        status.noProductsIds.push(productStatus.id)
      }
      status.orderPrice += productStatus.totalPrice
      status.totalCount += productStatus.count
      status.productsStatus.push(productStatus)
    }
    return status
  }

  // 获取商品的状态
  async _getProductStatus(oId, oCount, products) {
    let index = -1
    const productStatus = {
      id: null,
      name: '',
      price: 0,
      count: 0,
      mainImgUrl: '',
      totalPrice: 0,
      specification: '',
      haveStock: false,
      haveProduct: false
    }

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === oId) {
        index = i
        break
      }
    }

    // 客户端传的product_id的商品有可能是不存在的
    if (index === -1) {
      productStatus.id = oId
      return productStatus
    }

    productStatus.id = products[index].id
    productStatus.name = products[index].name
    productStatus.price = products[index].price
    productStatus.count = oCount
    productStatus.mainImgUrl = products[index].mainImgUrl
    productStatus.totalPrice = products[index].price * oCount
    productStatus.specification = products[index].specification
    productStatus.haveProduct = true
    productStatus.haveStock = products[index].stock - oCount >= 0 // 是否有库存

    return productStatus
  }

  // 获取订单快照
  async _getSnapOrder(addressId, status, products) {
    const { ctx } = this
    const userAddress = await ctx.service.userAddress.findByAddressId(addressId)
    if (!userAddress) {
      ctx.throwException(ctx.ExceptionTypes.USER_ADDERSS_NOT_FOUND)
    }
    const snap = {
      orderPrice: status.orderPrice,
      totalCount: status.totalCount,
      productsStatus: status.productsStatus,
      snapAddress: userAddress,
      snapName: status.productsStatus[0].name,
      snapSpecification: status.productsStatus[0].specification,
      snapImg: status.productsStatus[0].mainImgUrl
    }
    // 如果有多个商品name最后加个等字
    if (products.length > 1) {
      snap.name += '等'
    }
    return snap
  }

  // 创建订单
  async _createOrder(userId, oProducts, snapOrder) {
    const { ctx } = this
    const transaction = await ctx.model.transaction() // 创建事务
    try {
      const order = {
        userId,
        orderNo: this._generateOrderOn(),
        totalPrice: snapOrder.orderPrice,
        totalCount: snapOrder.totalCount,
        snapName: snapOrder.snapName,
        snapSpecification: snapOrder.snapSpecification,
        snapImg: snapOrder.snapImg,
        snapAddress: JSON.stringify(snapOrder.snapAddress),
        snapItems: JSON.stringify(snapOrder.productsStatus)
      }

      const result = await ctx.model.Order.create(order, { transaction }) // 添加事务
      for (let i = 0; i < oProducts.length; i++) {
        oProducts[i].orderId = result.id
      }

      await ctx.model.OrderProduct.bulkCreate(oProducts, { transaction }) // 添加事务
      // 提交事务
      await transaction.commit()
      return {
        orderId: result.id,
        orderNo: order.orderNo,
        createdAt: result.createdAt
      }
    } catch (err) {
      // 事务回滚
      await transaction.rollback()
      throw err
    }
  }

  // 生成订单编号
  _generateOrderOn() {
    const yCode = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ]
    const date = new Date()
    const currentYear = 2020
    const on = `${yCode[date.getFullYear() - currentYear]}${date.getMonth() + 1 <= 9 ? 0 : ''}${date.getMonth() + 1}${date.getDate() <= 9 ? 0 : ''}${date.getDate()}${date.getTime().toString().substring(-8)}${Math.floor(Math.random() * 10 * 9)}`
    return on
  }

}

module.exports = Order
