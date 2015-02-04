var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.get('/:chatroomNo', function(req, res){

    var chatroomNo = req.params.chatroomNo;
    if(chatroomNo == "" || chatroomNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
        return;
    }
    var memberNo = req.session.memberNo;
    if(memberNo == "" || memberNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNosss])", result:null});
        return;
    }
    var datas = [];
    datas.push(memberNo);
    global.queryName = 'member';
    var queryidname = 'genderMember';
    var memberGender = '';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        memberGender = datas[0].memberGender;
        console.log('ddddd' ,memberGender);
        //res.json(util.successCode(res, datas));
    });
    console.log('eeeee' ,memberGender);
    //랜덤 난수발생
    var datas = [];
    var questionType = '1'; //음성 질문 코드
    datas.push(questionType);

    global.queryName = 'myquestion';
    var queryidname = 'myquestionRandom';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        //console.log('ddd',datas[0].qCount);
        res.json(util.successCode(res, datas));
    });



    var m = util.createValueObject('Member');
    var q = util.createValueObject('Question');

    //res.json(util.successCode(res, {
    //    questionData : q.Question().questionData,
    //    questionGuideData : q.Question().questionGuideData,
    //    memberGender : m.Member().memberGender
    //}));
});

module.exports = router;