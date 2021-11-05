/*
 * @Author: your name
 * @Date: 2021-11-06 00:20:38
 * @LastEditTime: 2021-11-06 00:21:40
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \store-api\config\config.prod.js
 */
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
      key: path.join(appInfo.baseDir, 'app/public/ssl/6554519_www.yu-yin.xin.key'),
      cert: path.join(appInfo.baseDir, 'app/public/ssl/6554519_www.yu-yin.xin.pem')
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
