var express = require('express');
var router = express.Router();
const User = require('../models/user');
var session_checker = require('../middlewares/session_checker')

/**
 * @Method - GET
 */
router.get('/user', session_checker, function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * @Method - GET
 */
router.post('/user/register', session_checker, function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * @Method - GET
 */
router.get('/dashboard', session_checker, function(req, res, next) {
  res.send('dash');
});


/**
 * @Method - GET
 */
router.post('/user/:userid/uploaded', session_checker, function(req, res, next) {
  res.send('index');
});


/**
 * @Method - GET
 */
 router.get('/uploads', session_checker, (req, res) => {
	res.render('uploads');
});

module.exports = router;
