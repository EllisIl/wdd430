var express = require('express');
var path = require('path');
var router = express.Router();

router.use(express.static(path.join(__dirname, '../../dist/assignment/browser')));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/assignment/browser/index.html'));
});

module.exports = router;
