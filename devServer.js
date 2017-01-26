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
var request = require('request');
var auto = require("run-auto");
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

//app.get('/api/instagram', apiController.getInstagram);

app.get('/auth/instagram', passport.authenticate('instagram'));

app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

app.get('/login', function(req, res) {
    auto({
    	 getZeus: function(callback) {
            request('https://api.instagram.com/v1/users/427729012/media/recent/?access_token=427729012.17ad390.39d0613f9131494baa9bb16a0b44f586', function(err, response, body) {
                callback(err,body)
	        })
	    },
        getDennell: function(callback) {
            request('https://api.instagram.com/v1/users/4357624/media/recent/?access_token=4357624.d09a4fd.11ab31efa3fd428eb1bb19fab22a5a40', function(err, response, body) {
                callback(err,body)
            	})
           	}
        }, function(err, results) {
        if(err) res.status(500).send(err)
        res.status(200).json(results)
    })
});

// app.get('/login', function(req, res) {
//     request('https://api.instagram.com/v1/users/4357624/media/recent/?access_token=4357624.d09a4fd.11ab31efa3fd428eb1bb19fab22a5a40', function(err, response, body) {
//         if (!err && response.statusCode == 200) {
//             res.send(body);
//         }
//     })
// });

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


