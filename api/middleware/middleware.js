function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`${req.method} request to ${req.baseURL} endpoint returned ${req.status}`)
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
