var INSTAGRAM_CLIENT_ID = "d09a4fd75235430dbe95c142ce43a9fb"
var INSTAGRAM_CLIENT_SECRET = "96492f7eb9ec49c79d54b33e66d8c2d1";
var REDIRECT_URL = process.env.REDIRECT_URL;
var FRONT_END = process.env.FRONT_END;
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var InstagramStrategy = require('passport-instagram').Strategy;
var Instafeed = require("instafeed.js");
var userFeed = new Instafeed({
  get: 'user',
  userId: '4357624',
  accessToken: '4357624.d09a4fd.11ab31efa3fd428eb1bb19fab22a5a40'
});
userFeed.run();

console.log(userFeed);
var app = express();
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

app.get('/', function(req, res){
  console.log('Render Something', userFeed)
});

app.get('/hello', function(req, res){
  console.log("Testing hello");
  res.json({message: "Hello, world!"});
});

app.get('/auth/instagram',
  passport.authenticate('instagram'));

app.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/' }),
  function(req, res) {
    console.log('Success...')
    // Successful authentication, redirect home.
    res.redirect('/');
  });


var port = process.env.PORT || 7770;
var server = http.createServer(app);
server.listen(port);
console.log('Server listening on ', port);
