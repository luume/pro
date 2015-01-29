var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.post('/', function(req, res){


    var m = util.createValueObject('Member');

    util.successCode(res, {
        memberPushYn : m.Member().memberPushYn
    });

});

module.exports = router;