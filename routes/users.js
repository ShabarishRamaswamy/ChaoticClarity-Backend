var express = require('express');
var router = express.Router();

/**
 * @Method - GET
 */
router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * @Method - GET
 */
 router.post('/user/register', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * @Method - GET
 */
 router.post('/dashboard', function(req, res, next) {
  res.send('dashboard');
});


/**
 * @Method - GET
 */
 router.post('/user/:userid/uploaded', function(req, res, next) {
  res.send('index');
});

module.exports = router;
