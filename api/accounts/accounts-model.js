const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts').select('name','budget')
}

 const getById = id => {
  // DO YOUR MAGIC
  return db('accounts')
         .where('id',id)
         .first()
}

const create = account => {
  // DO YOUR MAGIC
  db('accounts').insert(account)
  .then(([id])=>{
    return getById(id)
  })

}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts')
         .where('id',id)
         .update(account)
         .then(()=>{
           return getById(id)
         })
}

const deleteById = id => {
  // DO YOUR MAGIC
  let accountToBeRemoved
  return getById(id)
    .then(account => {
      accountToBeRemoved = account
      return db('accounts').where({ id }).del()
    })
    .then(numOfDeltedRecords => {
      return accountToBeRemoved
    })
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
