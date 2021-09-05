const { Contact } = require('./contact')
const mongoose = require('mongoose')
const { DB_HOST } = require('../config')

mongoose.connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

function listContacts(userId) {
  try {
    const result = Contact.find({ owner: userId })
    return result
  } catch (error) {
    console.log(error.message)
  }
}

function getContactById(userId, contactId) {
  try {
    const contact = Contact.findOne({ owner: userId, _id: contactId })
    if (!contact) {
      return null
    }
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

function addContact(body) {
  try {
    const newContact = Contact.create(body)
    return newContact
  } catch (error) {
    console.log(error.message)
  }
}

function updateContact(userId, contactId, body) {
  try {
    const updatedContact = Contact.findOneAndUpdate({ owner: userId, _id: contactId }, body, { new: true })
    return updatedContact
  } catch (error) {
    console.log(error.message)
  }
}

function updateStatusContact(userId, contactId, body) {
  try {
    const updatedContact = Contact.findOneAndUpdate({ owner: userId, _id: contactId }, body, { new: true })
    return updatedContact
  } catch (error) {
    console.log(error.message)
  }
}

function removeContact(userId, contactId) {
  try {
    const deletedContact = Contact.findOneAndRemove({ owner: userId, _id: contactId })
    return deletedContact
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
