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
    var ta = util.createValueObject('Text_Answer');
    var q = util.createValueObject('Question');

    res.json(util.successCode(res, {
        chatroomNo : c.ChatRoom().chatroomNo,

        textAnswerData : ta.Text_Answer().textAnswerData,
        questionData : q.Question().questionData,
        memberNick : m.Member().memberNick
    }));
});

module.exports = router;