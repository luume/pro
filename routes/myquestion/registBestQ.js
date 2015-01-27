var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

    router.get('/', function(req, res){


    var m = util.createValueObject('Member');
    var q = util.createValueObject('Question');

    util.successCode(res, {
        questionData : q.Question().questionData,
        questionGuideData : q.Question().questionGuideData,
        questionRegDate : q.Question().questionRegDate
    });
});

module.exports = router;