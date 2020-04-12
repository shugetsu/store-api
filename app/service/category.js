const Service = require('egg').Service

class Category extends Service {

  // 查询商品分类列表
  async findProductCategoryList() {
    const { ctx } = this;
    const productCategoryList = await ctx.model.Category.findAll({
      attributes: { exclude: ['deletedAt'] },
      include: [
        {
          attributes: { exclude: ['deletedAt'] },
          model: ctx.model.Image,
          as: 'topicImage'
        },
        {
          attributes: { exclude: ['deletedAt'] },
          model: ctx.model.Product
        }
      ]
    })
    return productCategoryList
  }
}

module.exports = Category
