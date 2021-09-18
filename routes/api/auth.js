/* eslint-disable new-cap */
const express = require('express')
const router = express.Router()
const { User } = require('../../model/user')
const { userSchema } = require('../../validation')
const { asyncWrapper, authentication, upload } = require('../middlewares')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')
const { v4: idGenerator } = require('uuid')
const sendMail = require('../../utils/sendMail')
const { SECRET_KEY } = require('../../config')
const uploadDir = path.join(__dirname, '../../', 'public/avatars')

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
  const verifyToken = idGenerator()
  const newUser = new User({ email, verifyToken })
  newUser.setPassword(password)
  const avatar = gravatar.url(email)
  newUser.avatarURL = avatar
  const mail = {
    to: email,
    subject: 'Підтвердіть реєстрацію на сайті',
    html: `<a href="http://localhost:3000/users/verify/${verifyToken}">Підтвердіть реєстрацію, перейшовши за цим посиланням</a>`,
  }
  const isSuccessfulSending = await sendMail(mail)
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
  if (!user.verify) {
    throw new createError(400, 'Email is not verified')
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
  const id = req.user._id.toString()
  const oldFileName = req.file.originalname.split('.')
  const ext = oldFileName[oldFileName.length - 1]
  const newFileName = path.join(uploadDir, id + '.' + ext)
  const newUrl = '/avatars/' + id + '.' + ext
  try {
    const file = await Jimp.read(req.file.path)
    await file.resize(250, 250).write(newFileName)
    await fs.unlink(req.file.path)
    await User.findByIdAndUpdate(req.user._id, { avatarURL: newUrl })
    res.json({
      avatarUrl: newUrl
    })
  } catch (error) {
    await fs.unlink(req.file.path)
    throw error
  }
}

router.post('/register', asyncWrapper(register))
/* router.get('/users/verify/:verificationToken', asyncWrapper(verify)) */
router.post('/login', asyncWrapper(login))
router.post('/logout', asyncWrapper(authentication), asyncWrapper(logout))
router.get('/current', asyncWrapper(authentication), asyncWrapper(current))
router.patch('/avatars', asyncWrapper(authentication), upload.single('avatar'), asyncWrapper(updateImage))

module.exports = router
