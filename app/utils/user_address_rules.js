
const valid = require('./valid')

const rules = {
  update: {
    id: [{ validator: valid.empty() }, { validator: valid.integer() }],
    name: { validator: valid.empty() },
    mobile: { validator: valid.empty() },
    province: { validator: valid.empty() },
    city: { validator: valid.empty() },
    country: { validator: valid.empty() },
    detail: { validator: valid.empty() },
  },
  create: {
    name: { validator: valid.empty() },
    mobile: { validator: valid.empty() },
    province: { validator: valid.empty() },
    city: { validator: valid.empty() },
    country: { validator: valid.empty() },
    detail: { validator: valid.empty() },
  },
}

module.exports = rules
