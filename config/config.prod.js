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

  // SSL
  config.cluster = {
    https: {
      key: path.join(appInfo.baseDir, 'app/public/ssl/3801191_www.yu-yin.xin.key'),
      cert: path.join(appInfo.baseDir, 'app/public/ssl/3801191_www.yu-yin.xin.pem')
    }
  }

  // sequelize 配置
  config.sequelize = {
    dialect: 'mysql',
    username: 'store',
    password: '123456',
    database: 'sotre_production',
    host: '101.132.104.10',
    port: 3306,
    timezone: '+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    }
  }

  // add your user config here
  const userConfig = {
    imagePrefixPath: 'https://www.yu-yin.xin:8001/resource/images'
  }

  return {
    ...config,
    ...userConfig
  }
}
