/* eslint-disable new-cap */
const express = require('express')
const router = express.Router()
const { User } = require('../../model/user')
const { userSchema } = require('../../validation')
const asyncWrapper = require('../middlewares/controllerWrapper')
const createError = require('http-errors')
// const bcrypt = require('bcryptjs')

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
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(7))
  // const result = await User.create({ email, password: hashPassword })
  const newUser = new User({ email })
  newUser.setPassword(password)
  const result = await newUser.save()
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription
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
