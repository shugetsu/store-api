const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586241543263_520'

  // 中间件
  config.middleware = [
    'errorHandler'
  ]

  // 异常拦截只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api'
  }

  // 关闭egg 安全威胁 SSRF 的防范
  config.security = {
    csrf: {
      enable: false
    }
  }

  // 配置静态目录
  config.static = {
    prefix: '/resource',
    dir: path.join(appInfo.baseDir, 'app/public'),
  }

  // 设置跨域请求
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  // sequelize 配置
  config.sequelize = {
    dialect: 'mysql',
    username: 'store',
    password: '123456',
    database: 'sotre_development',
    host: '101.132.104.10',
    port: 3306,
    timezone: '+08:00'
  }

  // add your user config here
  const userConfig = {
    // imagePrefixPath: 'http://127.0.0.1:7001/resource/images'
    imagePrefixPath: 'http://www.yu-yin.xin:8001/resource/images'
  }

  return {
    ...config,
    ...userConfig
  }
}
