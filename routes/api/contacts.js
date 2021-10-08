const express = require('express')
const router = express.Router()
const {
  getContacts,
  getContact,
  saveContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts')
const { validateContact, validateStatusContact, validateId } = require('./validation')

router.get('/', getContacts)

router.get('/:id', validateId, getContact)

router.post('/', validateContact, saveContact)

router.delete('/:id', validateId, removeContact)

router.put('/:id', [validateId, validateContact], updateContact)

router.patch(
  '/:id/favorite/',
  [validateId, validateStatusContact],
  updateStatusContact,
)

module.exports = router