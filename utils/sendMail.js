const sgMail = require('@sendgrid/mail')
const { SENDGRID_KEY, SENDGRID_FROM } = require('../config')

sgMail.setApiKey(SENDGRID_KEY)

/* const mail = {
  to: 'example@ukr.net',
  from: SENDGRID_FROM,
  subject: 'Реєстрація на сайті',
  html: '<p>Вітаємо з успішною реєстрацією</p>',
}

sgMail.send(mail)
  .then(() => console.log('Email success send'))
  .catch(error => console.log(error.message)) */

const sendMail = async (sendData) => {
  try {
    const mail = { ...sendData, from: SENDGRID_FROM }
    await sgMail.send(mail)
    return true
  } catch (error) {
    return false
  }
}

module.exports = sendMail
