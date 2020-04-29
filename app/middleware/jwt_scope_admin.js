// 管理员权限验证
module.exports = options => {
  return async function adminInterceptor(ctx, next) {
    const token = ctx.header.token
    await ctx.helper.checkScope(token, next, scope => scope >= ctx.app.scope.ADMIN)
  }
}
