var express = require('express');
var router = express.Router();
var session_checker = require('../middlewares/session_checker')
const multer = require("multer");



/**
 * @Method - GET
 */
 router.get('/uploads', session_checker,(req, res) => {
    res.render('uploads', { link: req.session.code });
});

/**
 * @Method - GET
 */
 router.get('/upload', session_checker,(req, res) => {
    res.render('uploads', { link: req.session.code });
});

/**
 * @Method - POST
 */
 router.post('/upload', session_checker,(req, res) => {
    res.render('uploads', { link: req.session.code });
});

module.exports = router;