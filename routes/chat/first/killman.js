var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');
var gcmSetting = require('../../../afeel/util/gcmSetting');

var async =require('async');

// 소개 받기//////////
router.post('/', function(req, res) {

    var memberNo = req.body.memberNo; //죽일 남성 번호
    var chatroomNo = req.body.chatroomNo; //해당 채팅방 번호
    var rank = 4;

    var datas = [];
    datas.push(memberNo);
    datas.push(chatroomNo);
    datas.push(rank);

    var queryidname = 'killMan';

    async.waterfall([
        function (callback) {
            afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
                if (err) {
                    res.json(err);
                    return;
                }

                callback(null, datas);
            });
        }, // 첫번쨰 워터폴 종료

        function (row, callback) {
            if (row.affectedRows == 1) {
                afeelQuery.afeelQuery([memberNo], 'selectChatMember' , 'chat', function (err, datas) {
                    var pushNoArray = [];
                    if(memberNo != datas[0].memberM1No){
                        pushNoArray.push(datas[0].memberM1No);
                    }

                    if(memberNo != datas[0].memberM2No){
                        pushNoArray.push(datas[0].memberM2No);
                    }

                    if(memberNo != datas[0].memberM3No){
                        pushNoArray.push(datas[0].memberM3No);
                    }

                    if(memberNo != datas[0].memberM4No){
                        pushNoArray.push(datas[0].memberM4No);
                    }

                    gcmSetting.gcmSend(pushNoArray, {gcmType 	: 'CHAT2MAN',
                        chatroomNo 	: chatroomNo
                    });

                    gcmSetting.gcmSend([datas[0].memberWNo], {gcmType 	: 'CHAT2WOMAN',
                        chatroomNo 	: chatroomNo
                    });

                    gcmSetting.gcmSend([memberNo], {gcmType 	: 'CHAT1MANFAIL',
                        chatroomNo 	: chatroomNo
                    });

                    callback(null, 1);
                });
            }

        } // 2번째 워터폴
    ], function (err, result) {
        if(err) console.error(err);

        if(result == 1){
            res.json(util.successCode(res, 'success'));
        }else{
            res.json({success: 0, result: {message: '4등 탈락자 선정에 실패'}});
        }

    });

});

module.exports = router;
