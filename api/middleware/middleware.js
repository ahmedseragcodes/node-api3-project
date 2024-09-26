const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(`Method: ${req.method} URL: ${req.url} Date: ${new Date()}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
  .then((user)=>{
    if (!user){
      res.status(404).json({message: "user not found"})
    } else {
      req.user = user;
      next();
    }
  })
  .catch((err)=>{
    res.status(404).json({message: err.message})
  })
}

function validateUser(req, res, next) {
  const incomingName = req.body.name;
  if (!incomingName){
    res.status(400).json({message: "missing required name field"});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text){
    res.status(400).json({message: "missing required text field"});
  } else {
    next();
  }
}


module.exports = {
  logger, validateUserId, validateUser, validatePost
}