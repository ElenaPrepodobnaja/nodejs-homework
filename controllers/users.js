const jwt = require('jsonwebtoken')
<<<<<<< Updated upstream
const fs = require('fs/promises')
const Users = require('../repository/users')
const UploadService = require('../services/cloud-upload')
=======
const Users = require('../repository/users')
>>>>>>> Stashed changes
const { HttpCode } = require('../config/constants')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const registration = async (req, res, next) => {
  const { name, email, password, subscription } = req.body
  const user = await Users.findByEmail(email)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already exist',
    })
  }
  try {
    const newUser = await Users.create({ name, email, password, subscription })
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
<<<<<<< Updated upstream
        avatar: newUser.avatar,
=======
>>>>>>> Stashed changes
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await Users.findByEmail(email)
  const isValidPassword = await user.isValidPassword(password)
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Invalid credentials',
    })
  }
  const id = user._id
  const payload = { id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await Users.updateToken(id, token)
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    date: {
      token,
    },
  })
}

const logout = async (req, res, next) => {
  const id = req.user._id
  await Users.updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({ test: 'test' })
}

const currentUser = async (req, res, next) => {
<<<<<<< Updated upstream
  const { email, subscription } = req.user;
=======
  const { email } = req.body;
>>>>>>> Stashed changes
  const user = await Users.findByEmail(email);
  if (!user ) {
      return res
      .status(HttpCode.UNAUTHORIZED).json({
          status: 'error',
          code: HttpCode.UNAUTHORIZED,
          message: 'Not authorized',
      })
  }
<<<<<<< Updated upstream
  
=======
  const subscription = user.subscription;
>>>>>>> Stashed changes
  return res
      .status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          date: {
              email,
              subscription,
          }
      })
}

<<<<<<< Updated upstream
const uploadAvatar = async (req, res, next) => {
  const { id, idUserCloud } = req.user
  const file = req.file

  const destination = 'Avatars'
  const uploadService = new UploadService(destination)
  const { avatarUrl, returnIdUserCloud } = await uploadService.save(
    file.path,
    idUserCloud,
  )

  await Users.updateAvatar(id, avatarUrl, returnIdUserCloud)
  try {
    await fs.unlink(file.path)
  } catch (error) {
    console.log(error.message)
  }
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    date: {
      avatar: avatarUrl,
    },
  })
}

=======
>>>>>>> Stashed changes
module.exports = {
  registration,
  login,
  logout,
  currentUser,
<<<<<<< Updated upstream
  uploadAvatar,
}
=======
}
>>>>>>> Stashed changes
