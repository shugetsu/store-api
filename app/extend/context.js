'use strict'

const { default: Schema } = require('async-validator')
const CustomException = require('../exception/custom_exception')
const ExceptionTypes = require('../exception/exception_types')

module.exports = {

  // 成功响应内容
  successResponse(data, option = {}) {
    this.status = option.status || 200
    const code = 200
    const msg = option.msg || 'SUCCESS'
    this.body = Object.assign({ code, msg, data }, option)
  },

  // 所有异常类型
  ExceptionTypes,

  // 抛出自定义异常类型
  throwException(exceptionType, cover = {}) {
    throw new CustomException(Object.assign(exceptionType, cover))
  },

  // 参数校验
  async validate(params, rule) {
    const validator = new Schema(rule)
    const validResult = await validator.validate(params, { firstFields: true })
      .then(() => {
        // 验证通过 则返回验证的数据(注意：只返回规则里验证的字段，这么做的目的是过滤参数)
        // const filterParams = {}
        // for (const key in rule) {
        //   filterParams[key] = params[key]
        // }
        // return filterParams
        return params
      }).catch(({ errors, fields }) => {
        // 验证不通过
        const msg = errors.map(item => {
          // return { paramName: item.field, message: item.message }
          return item.message
        }).join()
        // this.throwException(this.ExceptionTypes.PARAMETER_ERROR, { msg })
        this.throwException(this.ExceptionTypes.PARAMETER_ERROR, { msg })
      })

    return validResult
  }
}
