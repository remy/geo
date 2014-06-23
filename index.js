'use strict';
var geoip = require('geoip-lite');
var express = require('express');

var app = express();

app.use(function (req, res) {
  // var ip = req.headers['x-real-ip'] || req.ip || '0.0';

  var ip = req.headers['x-forwarded-for'];
  if (ip) {
    var list = ip.split(',');
    ip = list[list.length-1];
  } else {
    ip = req.connection.remoteAddress;
  }

  var geo = geoip.lookup(ip);
  var ret = {
    ip: ip,
    geo: geo,
    // county: geo ? geo.county : null
  };
  res.jsonp(ret);
});

require('http').createServer(app).listen(process.env.PORT||3000);