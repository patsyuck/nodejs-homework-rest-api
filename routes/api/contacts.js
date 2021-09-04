const express = require('express')
const router = express.Router()
const contacts = require('../../model')
const { contactSchema, favoriteSchema } = require('../../validation')
const asyncWrapper = require('../middlewares/controllerWrapper')

const getAllContacts = async (req, res, next) => {
  const listContacts = await contacts.listContacts()
  res.json(listContacts)
}

const getOneContact = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contacts.getContactById(contactId)
  if (!contact) {
    res.status(404).json({
      message: 'Not Found'
    })
  }
  res.json(contact)
}

const addOneContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      message: 'missing required name field'
    })
    return
  }
  const newContact = await contacts.addContact(req.body)
  res.status(201).json(newContact)
}

const updateOneContact = async (req, res, next) => {
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
}

const updateOneStatus = async (req, res, next) => {
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
}

const deleteOneContact = async (req, res, next) => {
  const { contactId } = req.params
  const deletedContact = await contacts.removeContact(contactId)
  if (!deletedContact) {
    res.status(404).json({
      message: 'Not Found'
    })
  }
  res.json(deletedContact)
}

router.get('/', asyncWrapper(getAllContacts))
router.get('/:contactId', asyncWrapper(getOneContact))
router.post('/', asyncWrapper(addOneContact))
router.put('/:contactId', asyncWrapper(updateOneContact))
router.patch('/:contactId/favorite', asyncWrapper(updateOneStatus))
router.delete('/:contactId', asyncWrapper(deleteOneContact))

module.exports = router
