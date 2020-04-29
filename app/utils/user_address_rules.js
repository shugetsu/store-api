
const valid = require('./valid')

const rules = {
  update: {
    id: [{ validator: valid.required() }, { validator: valid.integer() }],
    name: { validator: valid.required() },
    mobile: [{ validator: valid.required() }, { validator: valid.phone() }],
    province: { validator: valid.required() },
    city: { validator: valid.required() },
    country: { validator: valid.required() },
    detail: { validator: valid.required() },
  },
  create: {
    name: { validator: valid.required() },
    mobile: [{ validator: valid.required() }, { validator: valid.phone() }],
    province: { validator: valid.required() },
    city: { validator: valid.required() },
    country: { validator: valid.required() },
    detail: { validator: valid.required() },
  },
}

module.exports = rules
