/* eslint-disable new-cap */
const express = require('express')
const router = express.Router()
const { User } = require('../../model/user')
const { userSchema } = require('../../validation')
const { asyncWrapper, authentication, upload } = require('../middlewares')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
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
  const avatar = gravatar.url(email)
  console.log(avatar)
  newUser.avatarURL = avatar
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

const logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { token: null })
  res.status(204).json()
}

const current = (req, res, next) => {
  res.json({
    email: req.user.email,
    subscription: req.user.subscription
  })
}

const updateImage = async (req, res, next) => {
  next()
}

router.post('/register', asyncWrapper(register))
router.post('/login', asyncWrapper(login))
router.post('/logout', asyncWrapper(authentication), asyncWrapper(logout))
router.get('/current', asyncWrapper(authentication), asyncWrapper(current))
router.patch('/avatars', asyncWrapper(authentication), upload.single('avatar'), asyncWrapper(updateImage))

module.exports = router
