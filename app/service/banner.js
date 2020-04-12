const Service = require('egg').Service

class BannerService extends Service {
  async findByBannerId(id) {
    const { ctx } = this
    const banner = await ctx.model.Banner.findByPk(id, {
      attributes: { exclude: ['deletedAt'] },
      include: {
        model: ctx.model.BannerItem,
        attributes: { exclude: ['deletedAt'] },
        include: {
          attributes: { exclude: ['deletedAt'] },
          model: ctx.model.Image
        }
      }
    })
    return banner
  }
}

module.exports = BannerService
