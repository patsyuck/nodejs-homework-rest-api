const Joi = require('joi')

// eslint-disable-next-line no-useless-escape
const emailSample = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// eslint-disable-next-line prefer-regex-literals
const phoneSample = '^[(][0-9]{3}[)][ ][0-9]{3}[-][0-9]{4}$'

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(RegExp(emailSample)).required(),
  phone: Joi.string().pattern(RegExp(phoneSample)).required(),
  favorite: Joi.boolean().default(false)
})

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = {
  contactSchema,
  favoriteSchema
}
