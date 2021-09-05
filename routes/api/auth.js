/* eslint-disable new-cap */
const express = require('express')
const router = express.Router()
const { User } = require('../../model/user')
const { userSchema } = require('../../validation')
const asyncWrapper = require('../middlewares/controllerWrapper')
const createError = require('http-errors')

const register = async (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    throw new createError(400, error.message)
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new createError(409, 'Email in use')
  }
  const result = await User.create(req.body)
  res.status(201).json({
    user: {
      email: email,
      subscription: 'starter'
    }
  })
}

const login = async (req, res, next) => {}
const logout = async (req, res, next) => {}
const current = async (req, res, next) => {}

router.post('/register', asyncWrapper(register))
router.post('/login', asyncWrapper(login))
router.post('/logout', asyncWrapper(logout))
router.get('/current', asyncWrapper(current))

module.exports = router
