var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

// 이메일 중복 확인
router.post('/', function(req, res) {

  res.json(util.successCode(res, 'success'));

});

module.exports = router;
