'use strict';
var geoip = require('geoip-lite');
var express = require('express');

var app = express();

app.use(function (req, res) {
  var ip = req.headers['x-real-ip'] || req.ip || '0.0';
  var geo = geoip.lookup(ip);
  var ret = {
    ip: ip,
    county: geo ? geo.county : null
  };
  res.jsonp(ret);
});

require('http').createServer(app).listen(process.env.PORT||3000);