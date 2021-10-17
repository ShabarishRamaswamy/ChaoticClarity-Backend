var express = require('express');

var session_checker = (req, res, next) => {
    if(req.session.active && req.session.accessToken){
        next()
    }else{
        res.redirect('/register')
    }
}

module.exports = session_checker