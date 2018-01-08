var express = require('express');
var user = express.Router();

/* GET home page. */
user.get('/', function(req, res, next) {
  res.render('index', { title: 'Express,Very Goood' });
});

module.exports = user;
