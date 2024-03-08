var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
res.json({thing: 'monkey'});
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Server' });
});
module.exports = router;
