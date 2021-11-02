var express = require('express');
var router = express.Router();
var session_checker = require('../middlewares/session_checker');
var axios = require('axios');
var User = require('../models/user');
var filename;

/**
 * @Method - GET
 */
router.get('/processPDF/:pdfnumber', session_checker, async(req, res, next) => {
    try{
        var user = await User.findOne({ username: req.session.username })
        
        console.log(`${user.username}-${req.params.pdfnumber}`)
    
        axios.post(`${process.env.ML_URL}/processPDF`, {
            filename: `${user.username}-${req.params.pdfnumber}`
        })
        filename = `${user.username}-${req.params.pdfnumber}`
        res.render('about', { link: req.session.code });
    }catch(e){
        console.log(e)
        res.redirect('/dashboard')
    }
});

/**
 * GET
 */
router.get('/PDFProcess/:pdfname', (req, res) => {
    try{
        res.send('Ok')
        var pdfname = req.params.pdfname
        console.error("GOT THE RESPONSE")
        var pdf_page_count = 0
        while( pdf_page_count < 10){
            
        }

    }catch(e){
        res.send('Not OK')
    }
})

module.exports = router;