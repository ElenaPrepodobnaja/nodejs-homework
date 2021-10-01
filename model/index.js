const crypto = require('crypto')
const DB = require('./db')
const db = new DB('./contacts.json')


const listContacts = async () => {
  return await db.read()
}

const getContactById = async (id) => {
  const contacts = await db.read()
  const [contact] = contacts.filter((contact) => contact.id === id)
  return contact
}

const removeContact = async (id) => {
  const contacts = await db.read()
  const index = contacts.findIndex((contact) => contact.id === id)
  if (index !== -1) {
    const [result] = contacts.splice(index, 1)
    await db.write(contacts)
    return result
  }
  return null
}

const addContact = async (body) => {
  const contacts = await db.read()
  const newContacts = {
    id: crypto.randomUUID(),
    favorite: false,
    ...body,
}
contacts.push(newContacts)
  await db.write(contacts)
  return newContacts

}
const updateContact = async (id, body) => {
  const contacts = await db.read()
  const index = contacts.findIndex((contact) => contact.id === id)
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body }
    await db.write(contacts)
    return contacts[index]
  }
  return null

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
