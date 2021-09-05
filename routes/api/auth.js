/* eslint-disable new-cap */
const express = require('express')
const router = express.Router()
const { User } = require('../../model/user')
const { userSchema } = require('../../validation')
const { asyncWrapper } = require('../middlewares')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../config')

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

const login = async (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    throw new createError(400, error.message)
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !user.validPassword(password)) {
    throw new createError(401, 'Email or password is wrong')
  }
  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

const logout = async (req, res, next) => {}
const current = async (req, res, next) => {}

router.post('/register', asyncWrapper(register))
router.post('/login', asyncWrapper(login))
router.post('/logout', asyncWrapper(logout))
router.get('/current', asyncWrapper(current))

module.exports = router
