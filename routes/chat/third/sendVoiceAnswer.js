var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.post('/', function(req, res){
    var chatroomNo = req.body.chatroomNo;
    var memberNo = req.session.memberNo;
    //if(chatroomNo == "" || chatroomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
    //    return;
    //}

    var voiceAnswerData = req.body.voiceAnswerData;
    //if(textAnwerData == "" || textAnwerData == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[textAnwerData])", result:null});
    //    return;
    //}
    var questionNo = req.body.questionNo;

    var datas = [];
    datas.push(voiceAnswerData);
    datas.push(chatroomNo);
    datas.push(memberNo);
    datas.push(questionNo);

    var queryidname = 'sendVoiceAnswer';
    afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
        if (err) {
            res.json(err);
            return;
        }
        if (datas.affectedRows == 1) {
            res.json(util.successCode(res, 'success'));
        }else {
            res.json({success: 0, result: {message: '음성 답변 전송에 실패'}});
            return;
        }
    });

    //res.json(util.successCode(res, 'success'));

});

module.exports = router;