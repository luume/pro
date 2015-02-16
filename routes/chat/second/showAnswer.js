var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');
var async = require('async');

router.get('/:chatroomNo', function(req, res){
    var chatroomNo = req.params.chatroomNo;
    //if(chatroomNo == "" || chatroomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
    //    return;
    //}
    var memberNo = req.session.memberNo;

    async.waterfall([
            function(callback) {
                var datas = [];
                datas.push(chatroomNo);
                var queryidname = 'selectAnswer';
                afeelQuery.afeelQuery(datas, queryidname , 'myquestion', function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){ //select 결과 row 0일때 처리
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    console.log('첫번째 처리 성공' , datas[0]);
                    callback(null, datas[0]);
                })
            },
            function(answerData, callback) {
                //  console.log('넘어온 멤버 젠더', memberGender);
                //   console.log('여자다');
                var datas = [];
                datas.push(chatroomNo);
                var queryidname = 'selectAnswer';
                afeelQuery.afeelQuery(datas, queryidname , 'expeople', function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    // console.log('여자인 데이터 잘가져옴');
                    console.log('두번째처리',datas);
                    var arr = [];
                    arr.push(answerData);
                    arr.push(datas);
                    callback(null, arr);
                    //res.json(util.successCode(res, datas));
                });

            }
        ],	function(err, results) {
            // console.log('최종 처리');
            // console.log('results' , results); // result <- done

            res.json(util.successCode(res, results));
        }
    );

    /* 질문 가져오기
    select questionData, questionGuideData from QUESTION
    where questionNo = (select questionNo from CHATROOM where chatroomNo = 9)
    */

    /* 텍스트 답변 가져오기
     SELECT TEXT_ANSWER.memberNo, TEXT_ANSWER.textAnswerData from QUESTION inner join
     TEXT_ANSWER on QUESTION.questionNo = TEXT_ANSWER.questionNo where TEXT_ANSWER.chatroomNo = 9
     */

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