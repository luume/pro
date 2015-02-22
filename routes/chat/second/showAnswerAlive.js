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

    var datas = [];
    datas.push(chatroomNo);
    datas.push(chatroomNo);
    var queryidname = 'showAnswerAlive';
    afeelQuery.afeelQuery(datas, queryidname , 'myquestion', function (err, datas) {
        if(err){
            res.json(err);
            return;
        }
        if(datas == false){
            res.json({ success : 0 , message : '데이터 없음', result : null});
            return;
        }

        console.log('data',datas);
        res.json(util.successCode(res, datas));

    });

    var m = util.createValueObject('Member');
    var c = util.createValueObject('ChatRoom');
    var ta = util.createValueObject('Text_Answer');
    var q = util.createValueObject('Question');

    //res.json(util.successCode(res, {
    //    chatroomNo : c.ChatRoom().chatroomNo,
    //
    //    textAnswerData : ta.Text_Answer().textAnswerData,
    //    questionData : q.Question().questionData,
    //    memberNick : m.Member().memberNick
    //}));
});

module.exports = router;