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

const create = ({name,budget}) => {
  // DO YOUR MAGIC
  return db('accounts')
    .insert({name,budget})
    .then(([id]) => getById(id));

}

const updateById = (id, {name,budget}) => {
  // DO YOUR MAGIC
  console.log(name,budget)
  return db('accounts')
         .where('id',id)
         .update({name,budget})
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
