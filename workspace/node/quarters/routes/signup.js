var express = require('express');
var router = express.Router();

/* GET signup page. */
router.get('/signup', function(req, res) {
  res.render('signup');
});
