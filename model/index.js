const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

async function readData() {
  const data = await fs.readFile(contactsPath)
  const result = JSON.parse(data)
  return result
}

async function listContacts() {
  try {
    const result = await readData()
    return result
    // return contacts
  } catch (error) {
    console.log(error.message)
  }
}

async function getContactById(contactId) {
  try {
    const result = await readData()
    const contact = result.find(item => item.id === contactId)
    if (!contact) {
      return null
      // throw new Error(`Contact with id=${contactId} not found!`)
    }
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

async function removeContact(contactId) {
  try {
    const result = await readData()
    const idx = result.findIndex(item => item.id === contactId)
    if (idx === -1) {
      throw new Error(`Contact with id=${contactId} not found!`)
    }
    const contact = result[idx]
    const contacts = result.filter(item => item.id !== contactId)
    const newContacts = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, newContacts)
    console.log('One contact removed:')
    console.log(contact)
  } catch (error) {
    console.log(error.message)
  }
}

// const addContact = async (body) => {}
async function addContact(name, email, phone) {
  try {
    const result = await readData()
    const idx = result[result.length - 1].id + 1
    const newContact = {
      id: idx,
      name: name,
      email: email,
      phone: phone
    }
    result[result.length] = newContact
    const newContacts = JSON.stringify(result)
    await fs.writeFile(contactsPath, newContacts)
    console.log('New contact added:')
    console.log(newContact)
  } catch (error) {
    console.log(error.message)
  }
}

// const updateContact = async (contactId, body) => { }
async function updateContact(contactId, name, email, phone) {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
