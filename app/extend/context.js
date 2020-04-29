const { default: Schema } = require('async-validator')
const CustomException = require('../exception/custom_exception')
const ExceptionTypes = require('../exception/exception_types')

module.exports = {

  // 成功响应内容
  successResponse(data, option = {}) {
    this.status = option.status || 200
    const code = 200
    const msg = 'SUCCESS'
    this.body = Object.assign({ code, msg, data }, option)
  },

  // 所有异常类型
  ExceptionTypes,

  // 抛出自定义异常类型
  throwException(exceptionType, cover = {}) {
    throw new CustomException(Object.assign(exceptionType, cover))
  },

  // 参数校验
  async validate(params, rules) {
    const validator = new Schema(rules)
    const validResult = await validator.validate(params, { firstFields: true })
      .then(() => {
        // 验证通过 返回参数
        return params
      }).catch(({ errors, fields }) => {
        // 验证不通过
        const msg = errors.map(item => item.message).join()
        this.throwException(this.ExceptionTypes.PARAMETER_ERROR, { msg })
      })

    return validResult
  }
}
