'use strict';

const async = require('async');
const request = require('request');
const cheerio = require('cheerio');
const ig = require('instagram-node').instagram();

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};


/**
 * GET /api/instagram
 * Instagram API example.
 */
exports.getInstagram = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'instagram');
  ig.use({ client_id: 'd09a4fd75235430dbe95c142ce43a9fb', client_secret: '96492f7eb9ec49c79d54b33e66d8c2d1' });
  ig.use({ access_token: '4357624.d09a4fd.11ab31efa3fd428eb1bb19fab22a5a40' });
  async.parallel({
    searchByUsername: (done) => {
      ig.user_search('dennellmarie', (err, users) => {
        done(err, users);
      });
    },
    searchByUserId: (done) => {
      ig.user('4357624', (err, user) => {
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
