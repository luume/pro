var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

var gcmSetting = require('../../../afeel/util/gcmSetting');

var async =require('async');

router.post('/', function(req, res){

    var memberNo = req.body.memberNo; //죽일 남성 번호
    var chatroomNo = req.body.chatroomNo; //해당 채팅방 번호
    var rank = 3;

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
                afeelQuery.afeelQuery([chatroomNo], 'selectSecondChatMember' , 'chat', function (err, datas) {

                    var pushNoArray = [];
                    async.each(datas, function (item, call) {

                        pushNoArray.push(item.memberNo);
                        call();
                    }, function (err) {
                        /*pushNoArray.push(datas[0].memberWNo);*/
                    });

                    gcmSetting.gcmSend(pushNoArray, {gcmType 	: 'CHAT3MAN',
                        chatroomNo 	: chatroomNo
                    });

                    gcmSetting.gcmSend([datas[0].memberWNo], {gcmType 	: 'CHAT3WOMAN',
                        chatroomNo 	: chatroomNo
                    });

                    gcmSetting.gcmSend([memberNo], {gcmType 	: 'CHAT2MANFAIL',
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
            res.json({success: 0, result: {message: '3등 탈락자 선정에 실패'}});
        }

    });
});

module.exports = router;