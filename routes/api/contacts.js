const express = require('express')
const router = express.Router()
const contacts = require('../../model')
const { contactSchema } = require('../../validation')

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
        message: 'Not Found'
      })
    }
    res.json({ contact: contact })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(400).json({
        message: 'missing required name field'
      })
    }
    const newContact = await contacts.addContact(req.body)
    res.status(201).json({ newContact: newContact })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(400).json({
        message: 'missing fields'
      })
    }
    const { contactId } = req.params
    const newContact = await contacts.updateContact(parseInt(contactId), req.body)
    if (!newContact) {
      res.status(404).json({
        message: 'Not Found'
      })
    }
    res.json({ updatedContact: newContact })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contacts.removeContact(parseInt(contactId))
    if (!contact) {
      res.status(404).json({
        message: 'Not Found'
      })
    }
    res.json({ contact: contact })
  } catch (error) {
    next(error)
  }
})

module.exports = router
