var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.get('/', function(req, res){

    var m = util.createValueObject('Member');

    util.successCode(res, {
        memberEmailYn : m.Member().memberEmailYn,
        memberSNSYn : m.Member().memberSNSYn
    });
});

module.exports = router;