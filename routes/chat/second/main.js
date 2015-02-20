var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.get('/:chatroomNo', function(req, res){
// d
    var chatroomNo = req.params.chatroomNo;
    var memberNo = req.session.memberNo;

    var datas = [];
    datas.push(chatroomNo);

    var queryidname = 'showTextQuestion';

    afeelQuery.afeelQuery(datas, queryidname ,'chat', function (err, datas) {
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
    //if(chatroomNo == "" || chatroomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
    //    return;
    //}

    var m = util.createValueObject('Member');
    var q = util.createValueObject('Question');

    //res.json(util.successCode(res, {
    //    questionData : q.Question().questionData,
    //    questionGuideData : q.Question().questionGuideData,
    //    memberGender : m.Member().memberGender
    //}));
});

//router.get('/select', function(req, res){
//
//    var chatroomNo = req.params.chatroomNo;
//    if(chatroomNo == "" || chatroomNo == undefined){
//        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
//        return;
//    }
//
//    var m = util.createValueObject('Member');
//    var q = util.createValueObject('Question');
//
//    res.json(util.successCode(res, {
//        questionData : q.Question().questionData,
//        questionGuideData : q.Question().questionGuideData,
//        memberGender : m.Member().memberGender
//    }));
//});

module.exports = router;