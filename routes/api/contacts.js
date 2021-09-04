/* eslint-disable new-cap */
const express = require('express')
const router = express.Router()
const contacts = require('../../model')
const { contactSchema, favoriteSchema } = require('../../validation')
const asyncWrapper = require('../middlewares/controllerWrapper')
const createError = require('http-errors')

const getAllContacts = async (req, res, next) => {
  const listContacts = await contacts.listContacts()
  res.json(listContacts)
}

const getOneContact = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contacts.getContactById(contactId)
  if (!contact) {
    throw new createError(404, 'Not Found')
  }
  res.json(contact)
}

const addOneContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    throw new createError(400, 'missing required name field')
  }
  const newContact = await contacts.addContact(req.body)
  res.status(201).json(newContact)
}

const updateOneContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    throw new createError(400, 'missing fields')
  }
  const { contactId } = req.params
  const updatedContact = await contacts.updateContact(contactId, req.body)
  if (!updatedContact) {
    throw new createError(404, 'Not Found')
  }
  res.json(updatedContact)
}

const updateOneStatus = async (req, res, next) => {
  const { error } = favoriteSchema.validate(req.body)
  if (error) {
    throw new createError(400, 'missing field favorite')
  }
  const { contactId } = req.params
  const updatedContact = await contacts.updateStatusContact(contactId, req.body)
  if (!updatedContact) {
    throw new createError(404, 'Not Found')
  }
  res.json(updatedContact)
}

const deleteOneContact = async (req, res, next) => {
  const { contactId } = req.params
  const deletedContact = await contacts.removeContact(contactId)
  if (!deletedContact) {
    throw new createError(404, 'Not Found')
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
