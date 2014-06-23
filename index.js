'use strict';
var geoip = require('geoip-lite');
var express = require('express');

var app = express();

app.use(function (req, res) {
  var ip = req.connection.remoteAddress;
  var geo = geoip.lookup(ip);
  res.jsonp(geo ? geo.county : 'null');
});

require('http').createServer(app).listen(process.env.PORT||3000);