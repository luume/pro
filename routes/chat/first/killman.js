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

                if (datas.affectedRows == 1) {
                    gcmSetting.gcmSend([memberNo], {gcmType 	: 'CHAT1MANFAIL',
                        chatroomNo 	: chatroomNo
                    });

                }else {
                    res.json({success: 0, result: {message: '4등 탈락자 선정에 실패'}});
                    return;
                }
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


    //CHAT_RANK에 선택된놈 4등 insert

    var m = util.createValueObject('Member');
    var f = util.createValueObject('Feeling');
    var p = util.createValueObject('Profil');


    //res.json(util.successCode(res,
    //    {
    //        memberName : m.Member().memberName,
    //        memberBirth : m.Member().memberBirth,
    //        memberGender  : m.Member().memberGender ,
    //        memberHobby  : m.Member().memberHobby ,
    //        memberAdd  : m.Member().memberAdd ,
    //        memberHeight  : m.Member().memberHeight ,
    //        memberJob  : m.Member().memberJob ,
    //        memberSnsYn  : m.Member().memberSnsYn ,
    //        memberHPYn  : m.Member().memberHPYn ,
    //        memberEmailYn  : m.Member().memberEmailYn ,
    //        memberStMeeting  : m.Member().memberStMeeting ,
    //        feelingCode1  : m.Member().feelingCode1 ,
    //        feelingCode2  : m.Member().feelingCode2 ,
    //        feelingCode3  : m.Member().feelingCode3 ,
    //        profilSaveFileName   : p.Member().profilSaveFileName
    //    }
    //));

});

module.exports = router;
