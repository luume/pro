var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

    router.get('/', function(req, res){
        //console.log('eeeeeeee',req.session.memberNo)
    var memberNo = req.session.memberNo;
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'myquestion';
    var queryidname = 'myquestionList';

    afeelQuery.afeelQuery(datas, queryidname , 'myquestion', function (err, datas) {
        if(err){
            res.json(err);
            return;
        }
        if(datas == false){
            res.json({ success : 0 , message : '데이터 없음', result : null});

            return;
        }

        res.json(util.successCode(res, datas));
    });


    var m = util.createValueObject('Member');
    var q = util.createValueObject('Question');

    //    res.json(util.successCode(res, {
    //    questionData : q.Question().questionData,
    //    questionGuideData : q.Question().questionGuideData,
    //    questionRegDate : q.Question().questionRegDate
    //}));
});

module.exports = router;