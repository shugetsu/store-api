/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const clientV1 = controller.client.v1
  // banner
  router.get('/api/client/v1/banner/getBannerById', clientV1.banner.getBannerById)

  // theme
  router.get('/api/client/v1/theme/getThemeList', clientV1.theme.getThemeList)
  router.get('/api/client/v1/theme/getThemeDetail', clientV1.theme.getThemeDetail)

  // product
  router.get('/api/client/v1/product/getNewProductList', clientV1.product.getNewProductList)
  router.get('/api/client/v1/product/getProductDetail', clientV1.product.getProductDetail)

  // category
  router.get('/api/client/v1/category/getProductCategoryList', clientV1.category.getProductCategoryList)

  // token
  router.get('/api/client/v1/token/getToken', clientV1.token.getToken)

  // userAddress
  router.get('/api/client/v1/userAddress/getUserAddress', app.middleware.jwtScopeUser(), clientV1.userAddress.getUserAddress)
  router.post('/api/client/v1/userAddress/addUserAddress', app.middleware.jwtScopeUser(), clientV1.userAddress.addUserAddress)
  router.post('/api/client/v1/userAddress/updateUserAddress', app.middleware.jwtScopeUser(), clientV1.userAddress.updateUserAddress)
}
