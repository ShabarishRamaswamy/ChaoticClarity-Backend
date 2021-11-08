var express = require("express");
var router = express.Router();
var session_checker = require("../middlewares/session_checker");
var axios = require("axios");
var User = require("../models/user");

router.get("/about", (req, res) => {
    res.render("about");
});

/**
 * @Method - GET
 */
router.get("/test", session_checker, function (req, res, next) {
    session = req.session;

    res.render("about", { link: session.code });
});

module.exports = router;
