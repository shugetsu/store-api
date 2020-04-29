
const valid = require('../utils/valid')

const rules = {
  page: [{ validator: valid.required() }, { validator: valid.integer() }],
  size: [{ validator: valid.required() }, { validator: valid.integer() }]
}

module.exports = rules
