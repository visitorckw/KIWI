var express = require('express');
var router = express.Router();
var database =  require('./firebase');

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;