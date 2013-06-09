/**
 * Simple proxy server to get around cross domain issues
 */

var express = require('express');
var app = module.exports = express();
var request = require('request');

/**
 * CORS
 */

app.use(cors);

/**
 * /*
 */

app.all('/*', function(req, res) {
  var url = req.url.replace(/^\/|\/$/g, '') + '/';
  if(!isurl(url)) return res.send(400);
  req.pipe(request(url)).pipe(res);
});

/**
 * Allow CORS
 */

function cors(req, res, next){
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  res.set('Access-Control-Allow-Methods', req.method);
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.set('Access-Control-Allow-Credentials', true);

  // Respond OK if the method is OPTIONS
  if(req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
}

/**
 * url?
 */

function isurl(url) {
  return /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i.test(url);
}

/**
 * Listen if we are calling this file directly
 */

if(!module.parent) {
  var port = process.argv[2] || 9000;
  app.listen(port);
  console.log('Server started on port', port);
}
