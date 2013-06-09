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
 * Listen if we are calling this file directly
 */

if(!module.parent) {
  var port = process.argv[2] || 9000;
  app.listen(port);
  console.log('Server started on port', port);
}
