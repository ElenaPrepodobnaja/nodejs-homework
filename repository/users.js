const User = require('../model/user')

const findById = async (id) => {
  return await User.findById(id)
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const findUserByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken })
}

const create = async (options) => {
  const user = new User(options)
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}

const updateTokenVerify = async (id, isVerified, verifyToken) => {
  return await User.updateOne({ _id: id }, { isVerified, verifyToken })
}

const takeCurrentUser = async(token) => {
  return await User.findOne({ token });
}
const updateAvatar = async (id, avatar, idUserCloud = null) => {
  return await User.updateOne({ _id: id }, { avatar, idUserCloud })
}

module.exports = { findById, findByEmail, create, updateToken, takeCurrentUser, updateAvatar,  updateTokenVerify,
  findUserByVerifyToken,}