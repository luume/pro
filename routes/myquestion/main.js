var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.get('/', function(req, res){
    console.log(req.session.memberNo);
    var memberNo = 4;
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'myquestion';
    var queryidname = 'myquestionList';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        res.json(util.successCode(res, datas));
    });

    var m = util.createValueObject('Member');
    var q = util.createValueObject('Question');

    //res.json(util.successCode(res, {
    //    questionData : q.Question().questionData,
    //    questionGuideData : q.Question().questionGuideData,
    //    questionRegDate : q.Question().questionRegDate,
    //    memberBestQ : m.Member().memberBestQ
    //}));
});
module.exports = router;