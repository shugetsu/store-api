const CustomException = require('../exception/custom_exception')

// 异常处理
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next()
    } catch (err) {
      // 如果是自定义异常，则统一格式处理
      if (err instanceof CustomException) {
        ctx.status = err.status
        ctx.body = { code: err.code, msg: err.msg, url: ctx.request.url }
      } else {
        // 如果是生产环境下程序发生异常，则屏蔽详细的报错信息
        if (ctx.app.config.env === 'prod') {
          ctx.status = ctx.ExceptionTypes.SERVER_ERROR.status
          ctx.body = {
            code: ctx.ExceptionTypes.SERVER_ERROR.code,
            msg: ctx.ExceptionTypes.SERVER_ERROR.msg,
            url: ctx.request.url
          }
          // 触发一个error事件，记录错误日志
          ctx.app.emit('error', err, ctx)
        } else {
          // 如果是开发环境则显示详细的报错信息
          throw err
        }
      }
    }
  }
}
