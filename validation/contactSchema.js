const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  // eslint-disable-next-line prefer-regex-literals
  phone: Joi.string().pattern(RegExp('^[(][0-9]{3,3}[)][ ][0-9]{3,3}[-][0-9]{4,4}$')).required()
})

module.exports = contactSchema
