var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

// 이메일 중복 확인
router.get('/', function(req, res) {

    res.render('index');

});

module.exports = router;
