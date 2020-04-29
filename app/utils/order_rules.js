
const valid = require('./valid')

const rules = {
  addressId: [{ validator: valid.required() }, { validator: valid.integer() }],
  products: {
    validator(rule, value, callback, options) {
      if (valid.isEmpty(value)) {
        callback({ message: 'products不能为空' })
      } else {
        if (valid.isArray(value)) {
          if (value.length > 0) {
            for (let i = 0; i < value.length; i++) {
              if (valid.isObject(value[i])) {
                const productId = value[i].productId || null
                const count = valid.isInteger(value[i].count) ? value[i].count : null
                if (!productId || !count) {
                  callback({ message: 'productId和count不能为空' })
                } else if (valid.isInteger(productId) && valid.isInteger(count)) {
                  if (count > 0) {
                    callback()
                  } else {
                    callback({ message: 'count必须大于0' })
                  }
                } else {
                  callback({ message: 'productId和count必须是正整数' })
                }
              } else {
                callback({ message: '数组里的每一项必须是对象' })
              }
            }
          } else {
            callback({ message: '商品不能为空' })
          }
        } else {
          callback({ message: `${rule.fullField}必须是数组` })
        }
      }
    }
  }
}

module.exports = rules
