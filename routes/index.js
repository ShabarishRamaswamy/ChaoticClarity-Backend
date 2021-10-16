var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/**
 * @Method - GET
 */
 router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * @Method - GET
 */
 router.post('/register', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
