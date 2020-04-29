const Service = require('egg').Service

class Product extends Service {

  // 查询最近新品
  async findNewProductList(count) {
    const { ctx } = this
    const productList = await ctx.model.Product.findAll({
      attributes: { exclude: ['deletedAt'] },
      order: [['created_at', 'DESC']],
      limit: parseInt(count)
    })
    return productList
  }

  // 查询分类商品
  async findByCategoryId(categoryId) {
    const { ctx } = this
    const category = await ctx.model.Category.findByPk(categoryId)
    if (category) {
      const categoryProductList = await ctx.model.Product.findAll({
        attributes: { exclude: ['deletedAt'] },
        where: {
          category_id: categoryId,
        },
      })
      return categoryProductList
    }
    return null
  }

  // 查询商品详情
  async findProductDetail(productId) {
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
