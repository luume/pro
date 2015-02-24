var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

var async = require('async');

router.get('/', function(req, res){

    var memberNo = req.session.memberNo;
    //if(memberNo == "" || memberNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
    //    return;
    //}
    //var memberNo = 4;

    console.log('??????????????????',memberNo);
    var datas = [];
    datas.push(memberNo);

    async.waterfall([
            function(callback) {
                //console.log('첫번째 처리');
                global.queryName = 'member';
                var queryidname = 'genderMember';
                afeelQuery.afeelQuery(datas, queryidname , 'member', function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){ //select 결과 row 0일때 처리
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                  //  console.log('첫번째 처리 성공' , datas[0].memberGender);
                    callback(null, datas[0].memberGender);
                })
            },
            function(memberGender, callback) {
              //  console.log('넘어온 멤버 젠더', memberGender);
                if (memberGender == 'M') { //datas[0].memberGender 로 현재 사용자의 성별을 파악함
                    console.log('남자다');
                    global.queryName = 'expeople';
                    var queryidname = 'myPrivateChatList_M';
                    afeelQuery.afeelQuery(datas, queryidname , 'expeople', function (err, datas) {
                        if(err){
                            res.json(err);
                            return;
                        }
                        if(datas == false){
                            res.json({ success : 0 , message : '데이터 없음', result : null});

                            return;
                        }
                        //console.log('data',datas);
                        callback(null, datas);

                    });

                } else {
                    console.log('여자다');
                    global.queryName = 'expeople';
                    var queryidname = 'myPrivateChatList_W';
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
                        //console.log('data',datas);
                        callback(null, datas, memberGender);
                        //res.json(util.successCode(res, datas));
                    });
                }
            }
            //aa
            //aa

        ],	function(err, results) {
           // console.log('최종 처리');
           // console.log('results' , results); // result <- done

            res.json(util.successCode(res, results));
        }
    );















    var m = util.createValueObject('Member');
    var pm = util.createValueObject('Private_Message');
    var p = util.createValueObject('Profil');

    //res.json({
    //        success : 1,
    //        message : 'OK',
    //        result : [{
    //            memberName :  m.Member().memberName,
    //            messageData : pm.Private_Message().messageData,
    //            messageDate : pm.Private_Message().messageDate,
    //            profilSaveFileName : 'https://54.92.4.84/images/Hydrangeas-thumbnail.jpg'
    //        },
    //            {
    //                memberName :  m.Member().memberName,
    //                messageData : pm.Private_Message().messageData,
    //                messageDate : pm.Private_Message().messageDate,
    //                profilSaveFileName : 'https://54.92.4.84/images/Jellyfish-thumbnail.jpg'
    //            },
    //            {
    //                memberName :  m.Member().memberName,
    //                messageData : pm.Private_Message().messageData,
    //                messageDate : pm.Private_Message().messageDate,
    //                profilSaveFileName : 'https://54.92.4.84/images/Koala-thumbnail.jpg'
    //            },
    //            {
    //                memberName :  m.Member().memberName,
    //                messageData : pm.Private_Message().messageData,
    //                messageDate : pm.Private_Message().messageDate,
    //                profilSaveFileName : 'https://54.92.4.84/images/Penguins-thumbnail.jpg'
    //            },
    //            {
    //                memberName :  m.Member().memberName,
    //                messageData : pm.Private_Message().messageData,
    //                messageDate : pm.Private_Message().messageDate,
    //                profilSaveFileName : 'https://54.92.4.84/images/Lighthouse-thumbnail.jpg'
    //            },
    //            {
    //                memberName :  m.Member().memberName,
    //                messageData : pm.Private_Message().messageData,
    //                messageDate : pm.Private_Message().messageDate,
    //                profilSaveFileName : 'https://54.92.4.84/images/Tulips-thumbnail.jpg'
    //            }
    //
    //        ]
    //
    //    }
    //
    //);
    //

    //
});

module.exports = router;