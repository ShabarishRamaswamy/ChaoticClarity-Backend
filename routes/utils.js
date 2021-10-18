var express = require('express');
var router = express.Router();
var session_checker = require('../middlewares/session_checker');
var axios = require('axios');
var User = require('../models/user');

router.get('/about', (req, res) => {
	res.render('about');
});


/**
 * @Method - GET
 */
router.get('/test', session_checker, function(req, res, next) {
    session = req.session;
  
    res.render('about', { link: session.code });
});

/**
 * @Method - GET
 */
router.get('/processPDF/:pdfname/:pdfnumber', session_checker, async(req, res, next) => {
    var user = await User.findOne({ username: req.session.username })
    
    axios.post(process.env.ML_URL, {
        filename: `${req.query.pdfname}-${req.query.pdfnumber}-${req.session.username}`
    })
    
    res.render('about', { link: session.code });
});

module.exports = router;