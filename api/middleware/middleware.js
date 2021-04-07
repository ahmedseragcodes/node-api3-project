const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`Method: ${req.method} URL: ${req.url} Date: ${new Date()}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id }=req.params;
  Users.getById(id)
  .then((user)=>{
    if (!user){
      res.status(404).json({message: "User With Id Not Found"})
    } else {
      next()
    }
  })
  .catch((err)=>{
    res.status(404).json({message: err.message})
  })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const incomingName = req.body.name;
  if (!incomingName){
    res.status(406).json({message: "Name is required"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text){
    res.status(406).json({message: "Post Text Is Required"});
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports={
  logger, validateUserId, validateUser, validatePost
}