
const valid = {
  isPhone(val) { return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val) },
  isInteger(val) { return /^[0-9]+$/.test(val) },
  isEmpty(val) { return val == null || /^\s*$/.test(val) },
  isString(val) { return typeof val === 'string' },
  isNumber(val) { return typeof val === 'number' },
  isObject(val) { return val != null && typeof val === 'object' },
  isArray(val) { return Object.prototype.toString.call(val) === '[object Array]' },
  isDate(val) { return Object.rules.toString.call(val) === '[object Date]' },
  isFile(val) { return Object.rules.toString.call(val) === '[object File]' },
  isBlob(val) { return Object.rules.toString.call(val) === '[object Blob]' },

  required() {
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
      if (this.isInteger(value) || this.isEmpty(value)) {
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

module.exports = valid
