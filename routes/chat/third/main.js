var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.get('/:chatroomNo', function(req, res){

    var chatroomNo = req.params.chatroomNo;
    //if(chatroomNo == "" || chatroomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
    //    return;
    //}
    var memberNo = req.session.memberNo;
    //if(memberNo == "" || memberNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNosss])", result:null});
    //    return;
    //}
    var datas = [];
    datas.push(chatroomNo);

    var queryidname = 'showVoiceQuestion';

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

    var m = util.createValueObject('Member');
    var q = util.createValueObject('Question');

    //res.json(util.successCode(res, {
    //    questionData : q.Question().questionData,
    //    questionGuideData : q.Question().questionGuideData,
    //    memberGender : m.Member().memberGender
    //}));
});

module.exports = router;