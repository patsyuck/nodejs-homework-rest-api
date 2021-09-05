/* eslint-disable new-cap */
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { SECRET_KEY } = require('../../config')
const { User } = require('../../model/user')

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new createError(401, 'Not authorized')
    }
    const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(id)
    if (!user || (token !== user.token)) {
      throw new createError(401, 'Not authorized')
    }
    req.user = user
    next()
  } catch {
    throw new createError(401, 'Not authorized')
  }
}

module.exports = authentication
