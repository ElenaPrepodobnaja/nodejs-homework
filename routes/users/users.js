const express = require('express')
const router = express.Router()
const { registration, login, logout, currentUser, uploadAvatar } = require('../../controllers/users')
const guard = require('../../helpers/guard')
const loginLimit = require('../../helpers/rate-limit-login')
const { validateUser } = require('./validation')
const upload = require('../../helpers/uploads')

router.post('/registration', validateUser, registration)
router.post('/login', loginLimit, validateUser, login)
router.post('/logout', guard, logout)
router.get('/current', guard, currentUser)
router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar)

module.exports = router