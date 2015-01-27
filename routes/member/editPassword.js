var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.get('/', function(req, res){

    var m = util.createValueObject('Member');

    util.successCode(res, {
        memberNo : m.Member().memberNo,
        memberPw : m.Member().memberPw
    });
});

router.post('/', function(req, res){


    util.successCode(res, 'success');

});

module.exports = router;