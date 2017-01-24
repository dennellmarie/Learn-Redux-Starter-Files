const passport = require('passport');
const request = require('request');
const InstagramStrategy = require('passport-instagram').Strategy;

/**
 * Sign in with Instagram.
 */
passport.use(new InstagramStrategy({
  clientID: 'd09a4fd75235430dbe95c142ce43a9fb',
  clientSecret: '96492f7eb9ec49c79d54b33e66d8c2d1',
  callbackURL: '/auth/instagram/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
     console.log(profile);
  }
));


