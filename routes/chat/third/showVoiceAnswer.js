var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');

router.get('/:chatroomNo', function(req, res){
    var chatroomNo = req.params.chatroomNo;
    if(chatroomNo == "" || chatroomNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
        return;
    }


    var m = util.createValueObject('Member');
    var c = util.createValueObject('ChatRoom');
    var va = util.createValueObject('Voice_Answer');
    var q = util.createValueObject('Question');

    util.successCode(res, {
        chatroomNo : c.ChatRoom().chatroomNo,

        voiceAnswerOriginalFileName : va.Voice_Answer().voiceAnswerOriginalFileName,
        questionData : q.Question().questionData,
        memberNick : m.Member().memberNick
    });
});

module.exports = router;