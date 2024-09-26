const express = require('express');
const { logger, validateUserId, validateUser, validatePost } = require("../middleware/middleware");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");


const router = express.Router();

//ENDPOINTS

//[GET] All Users

router.get('/', logger, (req, res) => {
 
  Users.get()
  .then((user)=>{
    res.status(200).json(user);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })
});

//[GET] User By Id

router.get('/:id', logger, validateUserId, (req, res) => {
 
  const { id }=req.params;

  Users.getById(id)
  .then((user)=>{
    res.status(200).json(user);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })
});

//[POST] New User

router.post('/', logger, validateUser, (req, res) => {
  
  Users.insert(req.body)
  .then((newUser)=>{
    res.status(201).json(newUser);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })
});

//[PUT] / UPDATE User By Id

router.put('/:id', (req, res) => {
  
  const { id }=req.params;
  const changes = req.body;

Users.update(id, changes)
.then((recordsUpdated)=>{
  if (recordsUpdated>0){
    return Users.getById(id);
  } else {
    res.status(404).json({message: "No records updated and/or no records found matching id"});
  }
})
.then((updatedUser)=>{
  res.status(200).json(updatedUser);
})
.catch((err)=>{
  res.status(500).json({message: err.messsage});
})
});

//[DELETE] User By Id

router.delete('/:id', logger, validateUserId, (req, res) => {
 
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

//[GET] Specific User's Posts

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  
  const { id }=req.params;
  
  Users.getUserPosts(id)
  .then((posts)=>{
    if (!posts){
      res.status(404).json({message: "No posts found for user"});
    } else {
      res.status(200).json(posts);
    }
  })
  .catch((err)=>{
    res.status(500).json({message: err.message})
  })
});

//[POST] New Post For Specific User

router.post('/:id/posts', logger, validateUserId, validatePost, (req, res) => {
 
  const { id }=req.params;

  const postBody = { ...req.body, user_id: id };

  Posts.insert(postBody)
  .then((newPost)=>{
    res.status(201).json(newPost);
  })
  .catch((err)=>{
    res.status(500).json({message: err.message});
  })

});



module.exports = router;