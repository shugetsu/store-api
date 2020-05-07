module.exports = app => {
  app.weChatConfig = {
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%appid&secret=%secret&js_code=%code&grant_type=authorization_code',
    weapp: {
      appid: 'wx42f24890c7b0928b',
      secret: '235f45ef0c821692b41792a29ff15682'
    }
  }

  app.CLIEN_TOKEN_EXPIRES = 216000 // 有效两天半 s/秒
  app.ADMIN_TOKEN_EXPIRES = 7200 // 有效两个小时 s/秒
  // 权限作用域
  app.scope = {
    USER: 16,
    ADMIN: 32
  }

  // app.use(async (ctx, next) => {
  //   ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
  //   ctx.set('Access-Control-Allow-Credentials', true)
  //   ctx.set('Access-Control-Allow-Methods', 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS')
  //   ctx.set('Access-Control-Allow-Headers', 'x-requested-with,content-type')
  //   await next()
  // })

  // app.use(async (ctx, next) => {
  //   if (ctx.method === 'OPTIONS') {
  //     ctx.set('Access-Control-Max-Age', 3600 * 24)
  //   }
  //   await next()
  // })
}
