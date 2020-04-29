
const valid = require('./valid')

const rules = {
  page: {
    validator(rule, value, callback, options) {
      if (valid.isEmpty(value)) {
        callback({ message: 'page不能为空' })
      } else if (valid.isInteger(value)) {
        callback()
      } else {
        callback({ message: 'page必须是整形' })
      }
    }
  },
  size: {
    validator(rule, value, callback, options) {
      if (valid.isEmpty(value)) {
        callback({ message: 'size不能为空' })
      } else if (valid.isInteger(value)) {
        callback()
      } else {
        callback({ message: 'size必须是整形' })
      }
    }
  }
}

module.exports = rules
