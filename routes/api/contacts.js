const express = require('express')
const router = express.Router()
const contacts = require('../../model')
const { contactSchema, favoriteSchema } = require('../../validation')

router.get('/', async (req, res, next) => {
  try {
    const listContacts = await contacts.listContacts()
    res.json(listContacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contacts.getContactById(contactId)
    if (!contact) {
      res.status(404).json({
        message: 'Not Found'
      })
    }
    res.json(contact)
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
      return
    }
    const newContact = await contacts.addContact(req.body)
    res.status(201).json(newContact)
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
      return
    }
    const { contactId } = req.params
    const updatedContact = await contacts.updateContact(contactId, req.body)
    if (!updatedContact) {
      res.status(404).json({
        message: 'Not Found'
      })
    }
    res.json(updatedContact)
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = favoriteSchema.validate(req.body)
    if (error) {
      res.status(400).json({
        message: 'missing field favorite'
      })
      return
    }
    const { contactId } = req.params
    const updatedContact = await contacts.updateStatusContact(contactId, req.body)
    if (!updatedContact) {
      res.status(404).json({
        message: 'Not Found'
      })
    }
    res.json(updatedContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deletedContact = await contacts.removeContact(contactId)
    if (!deletedContact) {
      res.status(404).json({
        message: 'Not Found'
      })
    }
    res.json(deletedContact)
  } catch (error) {
    next(error)
  }
})

module.exports = router
