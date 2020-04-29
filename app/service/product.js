const Service = require('egg').Service

class Product extends Service {

  // 查询最近新品
  async findNewProductList(count) {
    const { ctx } = this
    const productList = await ctx.model.Product.findAll({
      attributes: { exclude: ['deletedAt'] },
      order: [['created_at', 'DESC']],
      limit: count
    })
    return productList
  }

  // 根据商品id查找
  async findByProductId(productId) {
    const { ctx } = this
    const productDetail = await ctx.model.Product.findByPk(productId, {
      include: [
        {
          attributes: { exclude: ['deletedAt'] },
          model: ctx.model.ProductImage,
          include: {
            model: ctx.model.Image,
            order: [[ 'order', 'DASC' ]],
            as: 'image'
          }
        },
        {
          attributes: { exclude: ['deletedAt'] },
          model: ctx.model.ProductProperty
        }
      ]
    })
    return productDetail
  }
}

module.exports = Product
