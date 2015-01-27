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
    var cr = util.createValueObject('ChatRoom');
    var q = util.createValueObject('Question');
    var va = util.createValueObject('Voice_Answer');

    util.successCode(res, {

        chatroomNo : cr.ChatRoom().chatroomNo,
        questionData : q.Question().questionData,
        voiceAnswerOriginalFileName : va.Voice_Answer().voiceAnswerOriginalFileName
    });
});

module.exports = router;