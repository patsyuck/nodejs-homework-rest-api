const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  // eslint-disable-next-line prefer-regex-literals
  phone: Joi.string().pattern(RegExp('^[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}$')).required(),
  favorite: Joi.boolean().default(false)
})

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = {
  contactSchema,
  favoriteSchema
}
