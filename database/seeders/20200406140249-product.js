module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product', [
      { id: 1, name: '芹菜	半斤', price: 0.01, stock: 998, category_id: 3, main_img_url: '/product-vg@1.png', from: 1, img_id: 13, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 2, name: '梨花带雨	3个', price: 0.01, stock: 991, category_id: 2, main_img_url: '/product-dryfruit@1.png', from: 1, img_id: 10, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 3, name: '素米	327克', price: 0.01, stock: 996, category_id: 7, main_img_url: '/product-rice@1.png', from: 1, img_id: 31, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 4, name: '红袖枸杞	6克*3袋', price: 0.01, stock: 998, category_id: 6, main_img_url: '/product-tea@1.png', from: 1, img_id: 32, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 5, name: '春生龙眼	500克', price: 0.01, stock: 995, category_id: 2, main_img_url: '/product-dryfruit@2.png', from: 1, img_id: 33, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 6, name: '小红的猪耳朵	120克', price: 0.01, stock: 997, category_id: 5, main_img_url: '/product-cake@2.png', from: 1, img_id: 53, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 7, name: '泥蒿	半斤', price: 0.01, stock: 998, category_id: 3, main_img_url: '/product-vg@2.png', from: 1, img_id: 68, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 8, name: '夏日芒果	 3个', price: 0.01, stock: 995, category_id: 2, main_img_url: '/product-dryfruit@3.png', from: 1, img_id: 36, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 9, name: '冬木红枣	500克', price: 0.01, stock: 996, category_id: 2, main_img_url: '/product-dryfruit@4.png', from: 1, img_id: 37, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 10, name: '万紫千凤梨	300克', price: 0.01, stock: 996, category_id: 2, main_img_url: '/product-dryfruit@5.png', from: 1, img_id: 38, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 11, name: '贵妃笑	100克', price: 0.01, stock: 994, category_id: 2, main_img_url: '/product-dryfruit-a@6.png', from: 1, img_id: 39, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 12, name: '珍奇异果	3个', price: 0.01, stock: 999, category_id: 2, main_img_url: '/product-dryfruit@7.png', from: 1, img_id: 40, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 13, name: '绿豆	125克', price: 0.01, stock: 999, category_id: 7, main_img_url: '/product-rice@2.png', from: 1, img_id: 41, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 14, name: '芝麻	50克', price: 0.01, stock: 999, category_id: 7, main_img_url: '/product-rice@3.png', from: 1, img_id: 42, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 15, name: '猴头菇	370克', price: 0.01, stock: 999, category_id: 7, main_img_url: '/product-rice@4.png', from: 1, img_id: 43, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 16, name: '西红柿	1斤', price: 0.01, stock: 999, category_id: 3, main_img_url: '/product-vg@3.png', from: 1, img_id: 69, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 17, name: '油炸花生	300克', price: 0.01, stock: 999, category_id: 4, main_img_url: '/product-fry@1.png', from: 1, img_id: 44, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 18, name: '春泥西瓜子	128克', price: 0.01, stock: 997, category_id: 4, main_img_url: '/product-fry@2.png', from: 1, img_id: 45, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 19, name: '碧水葵花籽	128克', price: 0.01, stock: 999, category_id: 4, main_img_url: '/product-fry@3.png', from: 1, img_id: 46, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 20, name: '碧螺春	12克*3袋', price: 0.01, stock: 999, category_id: 6, main_img_url: '/product-tea@2.png', from: 1, img_id: 47, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 21, name: '西湖龙井	8克*3袋', price: 0.01, stock: 998, category_id: 6, main_img_url: '/product-tea@3.png', from: 1, img_id: 48, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 22, name: '梅兰清花糕	1个', price: 0.01, stock: 997, category_id: 5, main_img_url: '/product-cake-a@3.png', from: 1, img_id: 54, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 23, name: '清凉薄荷糕	1个', price: 0.01, stock: 998, category_id: 5, main_img_url: '/product-cake-a@4.png', from: 1, img_id: 55, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 25, name: '小明的妙脆角	120克', price: 0.01, stock: 999, category_id: 5, main_img_url: '/product-cake@1.png', from: 1, img_id: 52, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 26, name: '红衣青瓜 混搭	160克', price: 0.01, stock: 999, category_id: 2, main_img_url: '/product-dryfruit@8.png', from: 1, img_id: 56, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 27, name: '锈色瓜子	100克', price: 0.01, stock: 998, category_id: 4, main_img_url: '/product-fry@4.png', from: 1, img_id: 57, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 28, name: '春泥花生	200克', price: 0.01, stock: 999, category_id: 4, main_img_url: '/product-fry@5.png', from: 1, img_id: 58, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 29, name: '冰心鸡蛋	2个', price: 0.01, stock: 999, category_id: 7, main_img_url: '/product-rice@5.png', from: 1, img_id: 59, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 30, name: '八宝莲子	200克', price: 0.01, stock: 999, category_id: 7, main_img_url: '/product-rice@6.png', from: 1, img_id: 14, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 31, name: '深涧木耳	78克', price: 0.01, stock: 999, category_id: 7, main_img_url: '/product-rice@7.png', from: 1, img_id: 60, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 32, name: '土豆	半斤', price: 0.01, stock: 999, category_id: 3, main_img_url: '/product-vg@4.png', from: 1, img_id: 66, summary: null, created_at: new Date(), updated_at: new Date() },
      { id: 33, name: '青椒	半斤', price: 0.01, stock: 999, category_id: 3, main_img_url: '/product-vg@5.png', from: 1, img_id: 67, summary: null, created_at: new Date(), updated_at: new Date() }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product', null, {})
  }
}
