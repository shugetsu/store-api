const Service = require('egg').Service


class Token extends Service {

  // 获取token
  async getToken(code) {
    const { app } = this
    const appid = app.weChatConfig.weapp.appid
    const secret = app.weChatConfig.weapp.secret
    const wxLoginUrl = app.weChatConfig.loginUrl.replace('%appid', appid).replace('%secret', secret).replace('%code', code)
    const result = await this._wxLoginRequest(wxLoginUrl)
    return result
  }

  // 微信登录请求
  async _wxLoginRequest(wxLoginUrl) {
    const { ctx } = this
    const wxResult = await ctx.curl(wxLoginUrl, { method: 'get', dataType: 'json' }).then(rs => rs.data)
    if (!wxResult) {
      ctx.throwException(ctx.ExceptionTypes.WECHAT_SERVICE_INTERFACE_ERROR)
    }
    if (wxResult.errcode) {
      ctx.throwException(ctx.ExceptionTypes.WECHAT_SERVICE_INTERFACE_ERROR, { code: wxResult.errcode, msg: wxResult.errmsg })
    }
    const token = await this._generateToken(wxResult)
    return { token }
  }

  // 获取用户id
  async _getUserId(wxResult) {
    const { ctx } = this
    const user = await this._findUserByOpenid(wxResult.openid)
    if (!user) {
      const result = this._createUser({ openid: wxResult.openid, nickname: wxResult.nickname })
      if (!result) {
        ctx.throwException(ctx.ExceptionTypes.AUTHORIZATION_ADD_USER_ERROR)
      }
      return result.id
    }
    return user.id
  }

  // 生成token
  async _generateToken(wxResult) {
    const { ctx, app } = this
    const scope = app.scope.USER
    const expires = Math.floor(Date.now() / 1000) + app.CLIEN_TOKEN_EXPIRES
    const userId = await this._getUserId(wxResult)
    const token = ctx.helper.createToken({ userId, scope, expires, ...wxResult })
    return token
  }

  // 根据openid查找用户
  async _findUserByOpenid(openid) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({ where: { openid } })
    return user
  }

  // 向数据库添加一个用户记录
  async _createUser(user) {
    const { ctx } = this
    const result = await ctx.model.User.create(user)
    return result
  }
}

module.exports = Token

