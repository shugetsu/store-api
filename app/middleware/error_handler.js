
const CustomException = require('../exception/custom_exception')

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next()
    } catch (err) {
      if (err instanceof CustomException) {
        ctx.status = err.status
        ctx.body = { code: err.code, msg: err.msg, url: ctx.request.url }
      } else {
        if (ctx.app.config.env === 'prod') {
          ctx.status = 500
          ctx.body = { code: 999, msg: '服务器内部错误', url: ctx.request.url }
          ctx.app.emit('error', err, ctx)
        } else {
          throw err
        }
      }
    }
  }
}
