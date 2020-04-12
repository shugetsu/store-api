const Service = require('egg').Service

class Theme extends Service {

  // 查询专题列表
  async findThemeList() {
    const { ctx } = this
    const themeAll = await ctx.model.Theme.findAll({
      attributes: { exclude: ['deletedAt'] },
      include: [
        {
          attributes: { exclude: ['deletedAt'] },
          model: ctx.model.Image,
          as: 'topicImage'
        },
        {
          attributes: { exclude: ['deletedAt'] },
          model: ctx.model.Image,
          as: 'headImage'
        }
      ]
    })

    return themeAll
  }

  // 查询专题详情
  async findThemeDetail(themeId) {
    const { ctx } = this
    const theme = await ctx.model.Theme.findByPk(themeId, {
      attributes: { exclude: ['deletedAt'] },
      include: [
        {
          attributes: { exclude: ['deletedAt'] },
          model: ctx.model.Image,
          as: 'headImage'
        },
        {
          model: ctx.model.Product
        }
      ]
    })

    return theme
  }
}

module.exports = Theme
