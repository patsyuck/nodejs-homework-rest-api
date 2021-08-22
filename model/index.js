const fs = require('fs/promises')
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
      return null
    }
    const contact = result[idx]
    const contacts = result.filter(item => item.id !== contactId)
    const newContacts = JSON.stringify(contacts)
    await fs.writeFile(contactsPath, newContacts)
    return contact
  } catch (error) {
    console.log(error.message)
  }
}

async function addContact(body) {
  try {
    const result = await readData()
    const idx = result[result.length - 1].id + 1
    const newContact = {
      id: idx,
      name: body.name,
      email: body.email,
      phone: body.phone
    }
    result[result.length] = newContact
    const newContacts = JSON.stringify(result)
    await fs.writeFile(contactsPath, newContacts)
    return newContact
  } catch (error) {
    console.log(error.message)
  }
}

async function updateContact(contactId, body) {
  try {
    const result = await readData()
    const idx = result.findIndex(item => item.id === contactId)
    if (idx === -1) {
      return null
    }
    result[idx] = { ...result[idx], ...body }
    const newContacts = JSON.stringify(result)
    await fs.writeFile(contactsPath, newContacts)
    return result[idx]
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
