var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.get('/:chatroomNo/:memberNo', function(req, res){
    var chatroomNo = req.params.chatroomNo;
    if(chatroomNo == "" || chatroomNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
        return;
    }
    var memberNo = req.params.memberNo;
    if(memberNo == "" || memberNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
        return;
    }

    var datas = [];
    datas.push(chatroomNo);
    datas.push(memberNo);

    global.queryName = 'chat';
    var queryidname = 'showVoiceAnswerList';

    afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
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
    var cr = util.createValueObject('ChatRoom');
    var q = util.createValueObject('Question');
    var va = util.createValueObject('Voice_Answer');

    //res.json(util.successCode(res, {
    //
    //    chatroomNo : cr.ChatRoom().chatroomNo,
    //    questionData : q.Question().questionData,
    //    voiceAnswerOriginalFileName : va.Voice_Answer().voiceAnswerOriginalFileName
    //}));
});

module.exports = router;