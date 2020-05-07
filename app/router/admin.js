module.exports = app => {
  const { router, controller } = app
  const v1 = controller.admin.v1

  // image
  router.get('/api/admin/v1/common/captcha', v1.common.captcha)

  // user
  router.post('/api/admin/v1/user/login', v1.user.login)
}
