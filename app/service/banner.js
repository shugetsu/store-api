const Service = require('egg').Service

class BannerService extends Service {
  // 查询幻灯片
  async findByBannerId(bannerId) {
    const { ctx } = this
    const banner = await ctx.model.Banner.findByPk(bannerId, {
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
