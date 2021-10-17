var express = require('express');
var router = express.Router();
var session_checker = require('../middlewares/session_checker')
const multer = require("multer");
const User = require('../models/user');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pdfs/")
    },
    filename: async(req, file, cb) => {
        const user = await User.findOne({ username: req.session.username })
        const date = new Date()
        console.log(user)
        if(user){
            user.uploadedPDFs = user.uploadedPDFs.append(file.originalname)
            cb(null, `${req.session.username}-${user.uploadedPDFs.length}-${file.originalname}`)
        }else{
            cb(null, `${req.session.username}-${0}-${file.originalname}`)
        }
    },
})

const upload = multer({ storage })


/**
 * @Method - GET
 */
 router.get('/uploads', session_checker, (req, res) => {
    res.render('uploads', { link: req.session.code });
});


/**
 * @Method - GET
 */
 router.get('/upload', session_checker, (req, res) => {
    res.render('uploads', { link: req.session.code });
});


/**
 * @Method - POST
 */
 router.post('/upload', session_checker, upload.single('pdf'), (req, res) => {
    res.render('uploads', { link: req.session.code });
});


router.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    return res.send("Single file")
})

module.exports = router;