var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var INSTAGRAM_CLIENT_ID = "d09a4fd75235430dbe95c142ce43a9fb"
var INSTAGRAM_CLIENT_SECRET = "96492f7eb9ec49c79d54b33e66d8c2d1";
var REDIRECT_URL = process.env.REDIRECT_URL;
var FRONT_END = process.env.FRONT_END;
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
const passportConfig = require('./passport');
const apiController = require('./api');

var app = express();
var compiler = webpack(config);
app.use(cors());
app.use(express.static( './build'));
var jsonParser = bodyParser.json();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(passport.initialize());
app.use(passport.session());

app.get('/hello', function(req, res){
  console.log("Testing hello");
  res.json({message: "Hello, world!"});
});


app.get('/api/instagram', apiController.getInstagram);


app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var port = process.env.PORT || 7770;
var server = http.createServer(app);
server.listen(port);
console.log('Server listening on ', port);
app.listen(7770, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:7770');
});


