
const rules = require('./rules')

const Validators = {
  isPhone(val) { return rules.phone.test(val) },
  isInteger(val) { return rules.integer.test(val) },
  isEmpty(val) { return val == null || rules.empty.test(val) },
  isArray(val) { return Object.prototype.toString.call(val) === '[object Array]' },
  isString(val) { return typeof val === 'string' },
  isNumber(val) { return typeof val === 'number' },
  isObject(val) { return val !== null && typeof val === 'object' },
  isDate(val) { return Object.rules.toString.call(val) === '[object Date]' },
  isFile(val) { return Object.rules.toString.call(val) === '[object File]' },
  isBlob(val) { return Object.rules.toString.call(val) === '[object Blob]' },

  empty() {
    return (rule, value, callback, options) => {
      if (this.isEmpty(value)) {
        callback({ message: `${rule.fullField}不能为空` })
      } else {
        callback()
      }
    }
  },

  integer() {
    return (rule, value, callback, options) => {
      if (this.isInteger(value)) {
        callback()
      } else {
        callback({ message: `${rule.fullField}必须是正整数` })
      }
    }
  },

  phone() {
    return (rule, value, callback, options) => {
      if (this.isPhone(value)) {
        callback()
      } else {
        callback({ message: '手机号码格式不正确' })
      }
    }
  }
}

module.exports = Validators
