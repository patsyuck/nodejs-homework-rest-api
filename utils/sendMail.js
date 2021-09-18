/* eslint-disable new-cap */
const sgMail = require('@sendgrid/mail')
const createError = require('http-errors')
const { SENDGRID_KEY, SENDGRID_FROM } = require('../config')

sgMail.setApiKey(SENDGRID_KEY)

const sendMail = async (sendData) => {
  try {
    const mail = { ...sendData, from: SENDGRID_FROM }
    await sgMail.send(mail)
  } catch (error) {
    throw new createError(500, error.message)
  }
}

module.exports = sendMail
