/* eslint-disable new-cap */
const express = require('express')
const router = express.Router()
const contacts = require('../../model')
const { contactSchema, favoriteSchema } = require('../../validation')
const { asyncWrapper, authentication } = require('../middlewares')
const createError = require('http-errors')

const getAllContacts = async (req, res, next) => {
  const listContacts = await contacts.listContacts(req.user._id)
  res.json(listContacts)
}

const getOneContact = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contacts.getContactById(req.user._id, contactId)
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
  const newContact = await contacts.addContact({ ...req.body, owner: req.user._id })
  res.status(201).json(newContact)
}

const updateOneContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    throw new createError(400, 'missing fields')
  }
  const { contactId } = req.params
  const updatedContact = await contacts.updateContact(req.user._id, contactId, req.body)
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
  const updatedContact = await contacts.updateStatusContact(req.user._id, contactId, req.body)
  if (!updatedContact) {
    throw new createError(404, 'Not Found')
  }
  res.json(updatedContact)
}

const deleteOneContact = async (req, res, next) => {
  const { contactId } = req.params
  const deletedContact = await contacts.removeContact(req.user._id, contactId)
  if (!deletedContact) {
    throw new createError(404, 'Not Found')
  }
  res.json(deletedContact)
}

router.get('/', asyncWrapper(authentication), asyncWrapper(getAllContacts))
router.get('/:contactId', asyncWrapper(authentication), asyncWrapper(getOneContact))
router.post('/', asyncWrapper(authentication), asyncWrapper(addOneContact))
router.put('/:contactId', asyncWrapper(authentication), asyncWrapper(updateOneContact))
router.patch('/:contactId/favorite', asyncWrapper(authentication), asyncWrapper(updateOneStatus))
router.delete('/:contactId', asyncWrapper(authentication), asyncWrapper(deleteOneContact))

module.exports = router
