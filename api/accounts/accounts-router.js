const Account = require('./accounts-model')
const{
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId} = require('./accounts-middleware')

const router = require('express').Router()

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
  .then(data =>{
    res.json(data)
  })
  .catch(error =>{
    next(error)
  })
})

router.get('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload,checkAccountNameUnique,(req, res, next) => {
  // DO YOUR MAGIC
  const {name,budget} = req.body  
  Account.create({name,budget})
  .then(newAccount =>{
    res.status(201).json(newAccount)
  })
  .catch(error=>{
    next(error)
  })
})

router.put('/:id',checkAccountId,checkAccountPayload,checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  Account.updateById(req.params.id,req.body)
  .then(updatedAccount =>{
    res.json(updatedAccount)
  })
  .catch(error =>{
    next(error)
  })

});

router.delete('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.deleteById(req.params.id)
  .then(deletedAccount =>{
    res.json(deletedAccount)
  })
  .catch(error =>{
    next(error)
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
