const Service = require('egg').Service


class AppToken extends Service {

  // 获取token
  async getToken(userName, password) {
    const { ctx, app } = this
    const result = await this._check(userName, password)
    if (!result) {
      ctx.throwException(ctx.ExceptionTypes.AUTHORIZATION_ACCOUNT_ERROR)
    }
    const userId = result.id
    const scope = result.scope
    const expires = Math.floor(Date.now() / 1000) + app.ADMIN_TOKEN_EXPIRES
    const token = ctx.helper.createToken({ userId, scope, expires })
    return { token }
  }

  async _check(appId, appSecret) {
    const { ctx, app } = this
    const Op = app.Sequelize.Op
    const result = ctx.model.ThirdApp.findOne({
      where: {
        [Op.and]: [{ appId }, { appSecret }]
      }
    })
    return result
  }
}

module.exports = AppToken

