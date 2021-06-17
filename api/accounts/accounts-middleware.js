const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {name,budget} = req.body
  
  if(!name || !budget){
    res.status(400).json({message: "Name and budget are required"})
  }
  else if(!isNaN(name) ){
    res.status(400).json({message: "Name of account must be a string"})
  }
  else if(name.length <3 || name.length > 100){
    res.status(400).json({message: "name of the account must be between 3 and 100 characters"})
  }
  else if(isNaN(budget)){
    res.status(400).json({message: "budget in the account must be a number"})
  }
  else if(budget < 0 || budget > 1000000){
    res.status(400).json({message: "budget of the account is too large or too small"})
  }
  else {
    
    next()
  }
  
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  // get all accounts
  

  // cycle through the array.
  // if there's a match, respond with 400 message
  Account.getAll()
  .then(accounts=>{
    accounts.forEach(element => {
      if(element.name === req.name){
        res.status(400).json({message: 'that name is taken'})
      }     
    });
    next()
  })
  .catch(error=>{
    next(error)
  })
  
 
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
  .then(account =>{
    if(account){
      req.account = account
      next()
    }
    else{
      res.status(404).json("account not found")
    }
  })
  .catch(error =>{
    next(error)
  })
  
}
