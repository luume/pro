var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.post('/', function(req, res){


    util.successCode(res, 'success');

});

module.exports = router;