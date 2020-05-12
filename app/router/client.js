module.exports = app => {
  const { router, controller } = app
  const v1 = controller.client.v1


  // banner
  router.get('/api/client/v1/banner/getBannerById', v1.banner.getBannerById)

  // theme
  router.get('/api/client/v1/theme/getThemeList', v1.theme.getThemeList)
  router.get('/api/client/v1/theme/getThemeDetail', v1.theme.getThemeDetail)

  // product
  router.get('/api/client/v1/product/getNewProductList', v1.product.getNewProductList)
  router.get('/api/client/v1/product/getProductDetail', v1.product.getProductDetail)

  // category
  router.get('/api/client/v1/category/getProductCategoryList', v1.category.getProductCategoryList)

  // token
  router.get('/api/client/v1/token/getToken', v1.token.getToken)

  // userAddress
  router.get('/api/client/v1/userAddress/getUserAddress', app.middleware.jwtScopeUser(), v1.userAddress.getUserAddress)
  router.post('/api/client/v1/userAddress/addUserAddress', app.middleware.jwtScopeUser(), v1.userAddress.addUserAddress)
  router.post('/api/client/v1/userAddress/updateUserAddress', app.middleware.jwtScopeUser(), v1.userAddress.updateUserAddress)

  // order
  router.post('/api/client/v1/order/placeOrder', app.middleware.jwtScopeUser(), v1.order.placeOrder)
  router.get('/api/client/v1/order/getOrderList', app.middleware.jwtScopeUser(), v1.order.getOrderList)
}
