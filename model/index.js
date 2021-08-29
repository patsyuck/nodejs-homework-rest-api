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

function listContacts() {
  try {
    const result = Contact.find()
    return result
  } catch (error) {
    console.log(error.message)
  }
}

function getContactById(contactId) {
  try {
    const contact = Contact.findOne({ _id: contactId })
    if (!contact) {
      return null
    }
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

function removeContact(contactId) {
  try {
    const deletedContact = Contact.findByIdAndRemove({ _id: contactId })
    return deletedContact
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

function updateContact(contactId, body) {
  try {
    const updatedContact = Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
    return updatedContact
  } catch (error) {
    console.log(error.message)
  }
}

function updateStatusContact(contactId, body) {
  try {
    const updatedContact = Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
    return updatedContact
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
