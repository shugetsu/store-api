module.exports = options => {
  return async function adminInterceptor(ctx, next) {
    const token = ctx.header.token
    await ctx.service.token.checkScope(token, next, scope => scope >= ctx.app.scope.ADMIN)
  }
}
