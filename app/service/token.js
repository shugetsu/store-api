const Service = require('egg').Service
const crypto = require('crypto')

const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')


class Token extends Service {

  async getToken(type, code, encryptedData, iv) {
    const { app } = this
    // type = weapp | android | ios
    const appid = app.weChatConfig[type].appid
    const secret = app.weChatConfig[type].secret
    const wxLoginUrl = app.weChatConfig.loginUrl.replace('%appid', appid).replace('%secret', secret).replace('%code', code)
    const result = await this._wxLoginRequest(wxLoginUrl, appid, encryptedData, iv)
    return result
  }

  // 生成token
  generateToken(data) {
    const { ctx } = this
    try {
      const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem')) // 公钥
      const token = jwt.sign(data, cert, { algorithm: 'RS256' })
      return token
    } catch (err) {
      ctx.throwException(ctx.ExceptionTypes.AUTHORIZATION_TOKEN_GENERATE_ERROR)
    }
  }

  // 解密token
  verifyToken(token) {
    const { ctx } = this
    try {
      const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem')) // 私钥
      const result = jwt.verify(token, cert, { algorithms: 'RS256' })
      return result
    } catch (err) {
      ctx.throwException(ctx.ExceptionTypes.Common.AUTHORIZATION_TOKEN_INVALID)
    }
  }

  // 校验权限 由于中间件不能自由传参, 故而由此提供通用方法，给中间件调用
  async checkScope(token, next, callback) {
    const { ctx } = this
    if (token) {
      const tokenContent = this.verifyToken(token)
      const redisWxContent = await this.getCache(tokenContent.uid + '_wx')
      if (redisWxContent && redisWxContent.token === token) {
        const currentTime = Math.floor(Date.now() / 1000)
        if (tokenContent.expires >= currentTime) {
          const isPass = callback(tokenContent.scope)
          if (isPass) {
            // 可以访问
            await next()
          } else {
            // 权限不足
            ctx.throwException(ctx.ExceptionTypes.INSUFFICIENT_PERMISSION)
          }
        } else {
          // 已过期
          await this.removeCache(tokenContent.uid + '_token')
          await this.removeCache(tokenContent.uid + '_wx')
          ctx.throwException(ctx.ExceptionTypes.AUTHORIZATION_TOKEN_EXPIRE)
        }
      } else {
        // 已失效
        ctx.throwException(ctx.ExceptionTypes.AUTHORIZATION_TOKEN_LOSE_EFFICACY)
      }
    } else {
      // 没有权限
      ctx.throwException(ctx.ExceptionTypes.UNAUTHORIZED)
    }
  }

  //
  async setCache(key, data) {
    const { app } = this
    let cacheData = ''
    if (typeof data === 'object') {
      cacheData = JSON.stringify(data)
    } else {
      cacheData = data
    }
    const result = await app.redis.set(key, cacheData)
    return result
  }

  async getCache(key) {
    const { app } = this
    const result = await app.redis.get(key)
    try {
      return JSON.parse(result)
    } catch (err) {
      return result
    }
  }

  async removeCache(key) {
    const { app } = this
    const result = await app.redis.del(key)
    return result
  }
  // async getAdminToken(userName) {}
  async _wxLoginRequest(wxLoginUrl, appid, encryptedData, iv) {
    const { ctx, app } = this
    const wxResult = await ctx.curl(wxLoginUrl, { method: 'get', dataType: 'json' }).then(rs => rs.data)
    if (!wxResult) {
      ctx.throwException(ctx.ExceptionTypes.Common.WECHAT_SERVICE_INTERFACE_ERROR)
    }
    if (wxResult.errcode) {
      // ctx.throwException(ctx.ExceptionTypes.Common.WECHAT_SERVICE_INTERFACE_ERROR, { code: wxResult.errcode, msg: wxResult.errmsg })
      ctx.throwException(ctx.ExceptionTypes.Common.AUTHORIZATION_THIRD_PARTY_LOGIN_ERROR)
    }
    if (!wxResult.unionId) {
      wxResult.unionId = this._wxBizDataCrypt(wxResult.session_key, appid, encryptedData, iv).unionId
    }
    const result = await this._generateToken(wxResult)
    return result
  }

  // 向数据库添加一个用户记录
  async _createUser(user) {
    const { ctx } = this
    const result = await ctx.model.User.create(user)
    return result
  }

  // 根据unionid查询用户
  async _findUserByUnionid(unionid) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({
      where: { unionid },
    })
    return user
  }

  // 生成token
  async _generateToken(wxResult) {
    const { ctx, app } = this
    const user = await this._findUserByUnionid(wxResult.unionId)
    const scope = 16
    const expires = Math.floor(Date.now() / 1000) + app.CLIEN_TOKEN_EXPIRES
    let uid
    if (user) {
      uid = user.id
    } else {
      const result = await this._createUser({ unionid: wxResult.unionId })
      if (!result) {
        ctx.throwException(ctx.ExceptionTypes.Common.AUTHORIZATION_ADD_USER_ERROR)
      }
      uid = result.id
    }
    const token = this.generateToken({ uid, scope, expires })
    const cacheTokenResult = this.setCache(uid + '_token', token)
    const cacheWxResult = this.setCache(uid + '_wx', { ...wxResult, token })
    if (!cacheTokenResult || !cacheWxResult) {
      await this.removeCache(uid + '_token')
      await this.removeCache(uid + '_wx')
      ctx.throwException(ctx.ExceptionTypes.Common.AUTHORIZATION_CACHE_ERROR)
    }
    return { expires: app.CLIEN_TOKEN_EXPIRES, token }
  }

  // 解密微信数据
  _wxBizDataCrypt(sessionKey, appid, encryptedData, iv) {
    const { ctx } = this
    let decoded = null
    try {
      sessionKey = new Buffer(sessionKey, 'base64')
      encryptedData = new Buffer(encryptedData, 'base64')
      iv = new Buffer(iv, 'base64')
      // 解密
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      decoded = decipher.update(encryptedData, 'binary', 'utf8')
      decoded += decipher.final('utf8')
      decoded = JSON.parse(decoded)
    } catch (err) {
      ctx.throwException(ctx.ExceptionTypes.Common.AUTHORIZATION_USER_DATA_DECODE_ERROR)
    }
    if (decoded.watermark.appid !== appid) {
      ctx.throwException(ctx.ExceptionTypes.Common.AUTHORIZATION_USER_DATA_DECODE_ERROR)
    }
    return decoded
  }
}

module.exports = Token
