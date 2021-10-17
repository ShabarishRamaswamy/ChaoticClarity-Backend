var express = require('express');
var router = express.Router();
const User = require('../models/user');

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
  res.send('dash');
});


/**
 * @Method - GET
 */
router.post('/user/:userid/uploaded', function(req, res, next) {
  res.send('index');
});


/**
 * @Method - GET
 */
 router.get('/uploads', (req, res) => {
	res.render('uploads');
});

module.exports = router;
