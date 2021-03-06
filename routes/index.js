var express = require("express");
var router = express.Router();
const axios = require("axios");
const User = require("../models/user");
const { encrypt, decrypt } = require("../utils/crypto");
var session_checker = require("../middlewares/session_checker");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

/**
 * @Method - GET
 */
router.get("/login/github/response?:code", async (req, res, next) => {
    console.log(req.query.code);

    var session = req.session;
    session.code = req.query.code;

    console.log(session.code);

    res.redirect("/login/github/getUserEmail");
});

router.get("/login/github/getUserEmail", async (req, res, next) => {
    var session = req.session;

    axios
        .post(process.env.GITHUB_ACCESS_URL, {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: session.code,
        })
        .then(function (response) {
            const data = new URLSearchParams(response.data);
            const access_token = data.get("access_token");
            console.log("Access Token: " + access_token);

            // console.log(response.data);
            // console.log(data.access_token);

            axios
                .get(`https://api.github.com/user`, {
                    headers: {
                        Authorization: "token " + access_token,
                        Accept: "application/vnd.github.v3+json",
                        "user-agent": process.env.GITHUB_USER_AGENT,
                    },
                })
                .then(async (resp) => {
                    console.log(resp.data.login);
                    var user = await User.findOne({
                        username: resp.data.login,
                    });
                    console.log("ALRIGHT!");
                    if (!user) {
                        var user1 = new User({
                            username: resp.data.login,
                            githubCode: session.code,
                            accessToken: access_token,
                        });
                        await user1.save();
                        if (user1.accessToken !== access_token) {
                            user1.accessToken = access_token;
                            console.log(access_token);
                            await user1.save();
                        }
                    }

                    req.session.active = true;
                    req.session.accessToken = user
                        ? user.accessToken
                        : user1.accessToken;
                    req.session.username = user
                        ? user.username
                        : user1.username;

                    res.render("uploads");
                });
        })
        .catch(function (error) {
            console.log("Error: " + error);
            res.redirect("/register");
        });
});

/**
 * @Method - GET
 */
router.get("/register", function (req, res, next) {
    var url = new URL(process.env.GITHUB_URL);

    url.searchParams.append("client_id", process.env.GITHUB_CLIENT_ID);
    url.searchParams.append("redirect_uri", process.env.GITHUB_REDIRECT_URL);
    url.searchParams.append("scope", "user");

    console.log(process.env.GITHUB_CLIENT_ID);

    res.render("login", { link: url });
});

module.exports = router;
