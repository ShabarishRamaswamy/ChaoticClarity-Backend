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
  res.render('dash', { link: req.session.code });
});


/**
 * @Method - GET
 */
router.post('/user/uploaded', session_checker, function(req, res, next) {
  res.send('index');
});

module.exports = router;
