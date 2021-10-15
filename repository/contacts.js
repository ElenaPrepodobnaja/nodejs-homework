const Contact = require('../model/index')



const listContacts = async (userId, query) => {
    const {
        sortBy,
        sortByDesc,
        filter,
        favorite = false  ,
        limit = 5,
        offset = 0,
      } = query

      const searchOptions = { owner: userId }

      if (favorite !== false) {
        searchOptions.favorite = favorite
      }
    const results = await Contact.paginate(searchOptions, {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // { name: 1 }
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: {
          path: 'owner',
          select: 'name email subscription createdAt updatedAt',
        },
      })
      const { docs: contacts } = results
      delete results.docs
      return { ...results, contacts }
}

const getContactById = async (id, userId) => {
    const result = await Contact.findOne({ _id: id, owner: userId }).populate({
        path: 'owner',
        select: 'name email subscription createdAt updatedAt',
      })
    return result
}

const removeContact = async (id, userId) => {
    const result = await Contact.findOneAndRemove({ _id: id, owner: userId })
    return result
}

const addContact = async (body) => {
    const result = await Contact.create(body)
    return result

}
const updateContact = async (id, body, userId) => {
    const result = await Contact.findOneAndUpdate(
        { _id: id, owner: userId },
        { ...body },
        { new: true },
      )
      return result

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
