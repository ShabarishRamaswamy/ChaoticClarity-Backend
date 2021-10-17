var express = require('express');
var router = express.Router();
const axios = require('axios');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/**
 * @Method - GET
 */
 router.get('/login/github/response?:code', function(req, res, next) {
  console.log(req.query.code);

  var session = req.session;
  session.code = req.query.code;

  console.log(session.code)

  res.redirect('/login/github/getUserEmail');
});

router.get('/login/github/getUserEmail', (req, res, next) => {
  var session = req.session;

  axios.post(process.env.GITHUB_ACCESS_URL, {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: session.code
  })
  .then(function (response) {
    const data = new URLSearchParams(response.data);
    const access_token = data.get('access_token')
    console.log("Access Token: " + access_token);

    // console.log(response.data);
    // console.log(data.access_token);

    axios.get(`https://api.github.com/user`, {
      headers: {
        Authorization: "token " + access_token,
        Accept: "application/vnd.github.v3+json",
        'user-agent': process.env.GITHUB_USER_AGENT
      }
    }).then(resp => {
      // console.log(resp.data)
      // var user_data = JSON.parse(resp.data)
      console.log(resp.data.login)
    })


  })
  .catch(function (error) {
    console.log(error);
  });
  res.send("Logged  in!")
})

/**
 * @Method - GET
 */
 router.get('/test', function(req, res, next) {
  session = req.session;

  res.render('about', { link: session.code });
});


/**
 * @Method - GET
 */
 router.get('/register', function(req, res, next) {

  var url = new URL(process.env.GITHUB_URL);

  url.searchParams.append('client_id', process.env.GITHUB_CLIENT_ID);
  url.searchParams.append('redirect_uri', process.env.GITHUB_REDIRECT_URL);
  url.searchParams.append('scope', 'user');

  console.log(process.env.GITHUB_CLIENT_ID)

  res.render('about', {link: url});
});

module.exports = router;
