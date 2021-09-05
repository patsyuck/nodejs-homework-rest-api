const express = require('express')
const router = express.Router()
// const { userSchema } = require('../../validation')
const asyncWrapper = require('../middlewares/controllerWrapper')

const register = async (req, res, next) => {}
const login = async (req, res, next) => {}
const logout = async (req, res, next) => {}
const current = async (req, res, next) => {}

router.post('/register', asyncWrapper(register))
router.post('/login', asyncWrapper(login))
router.post('/logout', asyncWrapper(logout))
router.get('/current', asyncWrapper(current))

module.exports = router
