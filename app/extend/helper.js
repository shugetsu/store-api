const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

module.exports = {
  // 验证权限
  async checkScope(token, next, callback) {
    const { ctx } = this
    if (token) {
      const tokenContent = this.verifyToken(token)
      if (tokenContent) {
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
  },
  // 解密token
  verifyToken(token) {
    const { ctx } = this
    try {
      const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem')) // 私钥
      const result = jwt.verify(token, cert, { algorithms: 'RS256' })
      return result
    } catch (err) {
      ctx.throwException(ctx.ExceptionTypes.AUTHORIZATION_TOKEN_INVALID)
    }
  },
  // 创建token
  createToken(data) {
    const { ctx } = this
    try {
      const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem')) // 公钥
      const token = jwt.sign(JSON.stringify(data), cert, { algorithm: 'RS256' })
      return token
    } catch (err) {
      ctx.throwException(ctx.ExceptionTypes.AUTHORIZATION_TOKEN_GENERATE_ERROR)
    }
  },
  getUserId(token) {
    const userInfo = this.verifyToken(token)
    return userInfo.userId
  }
}
