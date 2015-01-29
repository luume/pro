var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.get('/', function(req, res){

    var m = util.createValueObject('Member');

    res.json(util.successCode(res, {
        memberCash : m.Member().memberCash
    }));
});

module.exports = router;