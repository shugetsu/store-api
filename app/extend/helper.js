const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

module.exports = {
  // 生成token
  generateToken(data) {
    const { ctx } = this
    try {
      const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem')) // 公钥
      const token = jwt.sign(data, cert, { algorithm: 'RS256' })
      return token;
    } catch (err) {
      this.throwException(this.ExceptionTypes.Common.AUTHORIZATION_TOKEN_GENERATE_ERROR)
    }
  },
  // 获取token里内容，jwt中间件验证通过后才能调用该方法
  verifyToken(token) {
    try {
      const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem')) // 私钥
      const result = jwt.verify(token, cert, { algorithms: 'RS256' })
      return result
    } catch (err) {
      this.throwException(this.ExceptionTypes.Common.AUTHORIZATION_TOKEN_INVALID)
    }
  },

  // setCache(key, data) {
  //   return pg.set(key, data);
  // },
  // getCache(key) {
  //   try {
  //     return pg.get(key).data;
  //   } catch (err) {
  //     return null;
  //   }
  // },
  // removeCache(key) {
  //   return pg.remove(key);
  // },
  // clearCache() {
  //   return pg.clear();
  // },
};
