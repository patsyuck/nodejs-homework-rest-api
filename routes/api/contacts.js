const express = require('express')
const router = express.Router()
const contacts = require('../../model')

router.get('/', async (req, res, next) => {
  try {
    const listContacts = await contacts.listContacts()
    res.json({ contacts: listContacts })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contacts.getContactById(parseInt(contactId))
    if (!contact) {
      res.status(404).json({
        message: 'NotFound'
      })
    }
    res.json({ contact: contact })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
