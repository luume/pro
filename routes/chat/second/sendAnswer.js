var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');
var gcmSetting = require('../../../afeel/util/gcmSetting');

var async = require('async');

router.post('/', function(req, res){
    var chatroomNo = req.body.chatroomNo;
    var memberNo = req.session.memberNo;
    //if(chatroomNo == "" || chatroomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
    //    return;
    //}

    var textAnswerData = req.body.textAnswerData;
    var questionNo = req.body.questionNo;

    var datas = [];


    async.waterfall([

        function (callback) {
            afeelQuery.afeelQuery([req.session.memberNo], 'genderMember' , 'member', function (err, datas) {

                if(err)console.error(err);

                callback(null, datas[0].memberGender)

            });
        }, // 첫번째 워터폴


        function (memberGender , callback) {
            datas.push(textAnswerData);
            datas.push(chatroomNo);
            datas.push(memberNo);
            datas.push(questionNo);
            console.log(datas);
            afeelQuery.afeelQuery(datas, 'sendTextAnswer' , 'chat', function (err, datas) {
                if(err)console.error(err);
                callback(null, 1, memberGender)

            });
        }, // 2번째 워터폴


        function (successCode, memberGender, callback) {
            if(successCode == 1){
                console.log('성공 진입');
                afeelQuery.afeelQuery([chatroomNo], 'insertCount' , 'chat', function (err, datas) {
                    if(err)console.error(err);
                    callback(null, datas[0].insertCount, memberGender)
                    console.log('성공22 진입');
                });
            } // if end
        }
    ], function (err, result, memberGender) {

        if(err) console.error(err);

        if(memberGender == 'W'){
            gcmSetting.gcmSend([req.session.memberNo], { gcmType : 'CHAT2MANWAIT', chatroomNo : chatroomNo } );
            res.json(util.successCode(res, 'success'));
        }else if(memberGender == 'M' && result == 3){
            afeelQuery.afeelQuery([memberNo], 'selectChatMember' , 'chat', function (err, datas) {

                gcmSetting.gcmSend([datas[0].memberWNo], { gcmType : 'CHAT2WOMANSELECT', chatroomNo : chatroomNo } );
                res.json(util.successCode(res, 'success'));
            });

        }



    });
/*

    var queryidname = 'sendTextAnswer';
    afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
        if (err) {
            res.json(err);
            return;
        }
        if (datas.affectedRows == 1) {
            res.json(util.successCode(res, 'success'));
        }else {
            res.json({success: 0, result: {message: '답변 전송에 실패'}});
            return;
        }
    });
    //if(textAnwerData == "" || textAnwerData == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[textAnwerData])", result:null});
    //    return;
    //}

    //res.json(util.successCode(res, 'success'));
*/

});

module.exports = router;