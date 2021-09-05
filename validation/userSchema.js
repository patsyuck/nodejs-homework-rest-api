const Joi = require('joi')

// eslint-disable-next-line no-useless-escape
const emailSample = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = Joi.object({
  email: Joi.string().pattern(RegExp(emailSample)).required(),
  password: Joi.string().min(7).required()
})

module.exports = { userSchema }
