var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.user && req.session.house) {
      res.redirect('/main/bulletin');
    } else {
      res.render('index', { title: 'Express' });
    }

});

router.get('/upload', function(req, res) {
    console.log("the first function might work...");
    res.render('upload', { title: 'File Upload Test' });
    console.log("yup!");
});

router.post('/upload', function(req, res) {
    console.log("the second function might work...");
    console.dir(req.files);
    console.log("yup!");
});

module.exports = router;
