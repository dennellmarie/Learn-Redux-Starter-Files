var INSTAGRAM_CLIENT_ID = "d09a4fd75235430dbe95c142ce43a9fb"
var INSTAGRAM_CLIENT_SECRET = "96492f7eb9ec49c79d54b33e66d8c2d1";
var REDIRECT_URL = process.env.REDIRECT_URL;
var FRONT_END = process.env.FRONT_END;
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var app = express();
const ig = require('instagram-node').instagram();
app.use(cors());

app.use(express.static( './build'));
var jsonParser = bodyParser.json();

passport.serializeUser(function(user, done) {
  done(null, user)
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());

passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "http://localhost:7770/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
));

app.get('/hello', function(req, res){
  console.log("Testing hello");
  res.json({message: "Hello, world!"});
});


/**
 * GET /api/instagram
 * Instagram API example.
 */
exports.getInstagram = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'instagram');
  ig.use({ client_id: d09a4fd75235430dbe95c142ce43a9fb, client_secret: process.env.INSTAGRAM_SECRET });
  ig.use({ access_token: token.accessToken });
  async.parallel({
    searchByUsername: (done) => {
      ig.user_search('richellemead', (err, users) => {
        done(err, users);
      });
    },
    searchByUserId: (done) => {
      ig.user('175948269', (err, user) => {
        done(err, user);
      });
    },
    popularImages: (done) => {
      ig.media_popular((err, medias) => {
        done(err, medias);
      });
    },
    myRecentMedia: (done) => {
      ig.user_self_media_recent((err, medias) => {
        done(err, medias);
      });
    }
  }, (err, results) => {
    if (err) { return next(err); }
    res.render('api/instagram', {
      title: 'Instagram API',
      usernames: results.searchByUsername,
      userById: results.searchByUserId,
      popularImages: results.popularImages,
      myRecentMedia: results.myRecentMedia
    });
  });
};

var port = process.env.PORT || 7770;
var server = http.createServer(app);
server.listen(port);
console.log('Server listening on ', port);
