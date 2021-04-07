const express = require('express');

const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const mw = require("../middleware/middleware")
const { logger, validateUserId, validateUser, validatePost }=mw;

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch((err)=>{
    res.status(500).json({message: err.message})
  })
});

router.get('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const { id }=req.params;
  Users.getById(id)
  .then((user)=>{
    res.status(200).json(user);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message})
  })
});

router.post('/', logger, validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then((newUser)=>{
    res.status(200).json(newUser);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message})
  })
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id }=req.params;
  Users.remove(id)
  .then((recordsDeleted)=>{
    if (recordsDeleted > 0){
      res.status(200).json({message: "All Records Matching ID Successfully Deleted"})
    } else {
      res.status(404).json({message: "Unable to find any records matching id to delete"})
    }
  })
  .catch((err)=>{
    res.status(500).json({message: err.message})
  })
});

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id }=req.params;
  Users.getUserPosts(id)
  .then((posts)=>{
    if (!posts){
      res.status(404).json({message: "No posts found for user"})
    } else {
      res.status(200).json(posts);
    }
  })
  .catch((err)=>{
    res.status(500).json({message: err.message})
  })
});

router.post('/:id/posts', validateUserId, validatePost,  (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  const { id }=req.params;
  const postBody = { ...req.body, user_id: id }

  Posts.insert(postBody)
  .then((newPost)=>{
    res.status(200).json(newPost)
  })
  .catch((err)=>{
    res.status(500).json({message: err.message})
  })
});

// do not forget to export the router

module.exports = router;