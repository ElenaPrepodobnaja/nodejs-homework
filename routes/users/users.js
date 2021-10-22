const express = require('express')
const router = express.Router()
const { registration, login, logout, currentUser } = require('../../controllers/users')
const guard = require('../../helpers/guard')
const loginLimit = require('../../helpers/rate-limit-login')
const { validateUser } = require('./validation')

router.post('/registration', validateUser, registration)
router.post('/login', loginLimit, validateUser, login)
router.post('/logout', guard, logout)
router.get('/current', guard, validateUser, currentUser)

module.exports = router