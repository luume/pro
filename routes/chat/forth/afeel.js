var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

var async = require('async');
router.post('/:memberTo', function(req, res){

    //var chatroomNo = req.body.chatroomNo;
    //var chatroomNo = 123;
    //if(chatroomNo == "" || chatroomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
    //    return;
    //}

    var memberNo = req.session.memberNo; //자기 자신
    var memberTo = req.params.memberTo; //어필할 상대
    var memberGender = req.body.memberGender; //현재 사용자 성별
    var omegi = req.body.omegi; //어필할 상대

    //if(memberNo == "" || memberNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
    //    return;
    //}

    var datas = [];
    datas.push(memberNo);

    async.waterfall([
            function(callback) {
                //console.log('첫번째 처리');
                global.queryName = 'mystore';
                var queryidname = 'myMainList';
                afeelQuery.afeelQuery(datas, queryidname , 'mystore', function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){ //select 결과 row 0일때 처리
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    //  console.log('첫번째 처리 성공' , datas[0].memberGender);
                    callback(null, datas[0].memberCash);
                })
            },
            function(memberCash, callback) {
                var datas = [];
                datas.push(memberNo);
                //  console.log('넘어온 멤버 젠더', memberGender);
                if (memberCash >= omegi) { //캐쉬가 충분할 경우
                    async.waterfall([
                            function(callback) {
                                //console.log('첫번째 처리');
                                global.queryName = 'member';
                                var queryidname = 'UpdateMemberCash';
                                var calOmegi = memberCash - omegi;
                                var datas = [];
                                datas.push(calOmegi);
                                datas.push(memberNo);
                                afeelQuery.afeelQuery(datas, queryidname , 'member', function (err, datas) { //오메기떡 차감
                                    if(err){
                                        res.json(err);
                                        return;
                                    }
                                    if(datas == false){ //select 결과 row 0일때 처리
                                        res.json({ success : 0 , message : '데이터 없음', result : null});
                                        return;
                                    }
                                    //  console.log('첫번째 처리 성공' , datas[0].memberGender);
                                    callback(null, '1');
                                })
                            },
                            function(aa, callback) {
                                //  console.log('넘어온 멤버 젠더', memberGender);
                                //   console.log('여자다');
                                //

                                //
                                if(memberGender == 'M'){ //현재 사용자가 남자 -> memberMNo = memberNo, memberWNo = memberTo
                                    var datas = [];
                                    datas.push(memberTo);
                                    datas.push(memberNo);
                                }
                                else { //현재 사용자가 여자 -> memberMNo = memberTo, memberWNo = memberNo
                                    var datas = [];
                                    datas.push(memberNo);
                                    datas.push(memberTo);
                                }
                                //
                                async.waterfall([
                                        function(callback) {
                                            //console.log('첫번째 처리');
                                            var queryidname = 'checkPrivateChatList'; //중복 채팅방 체크
                                            afeelQuery.afeelQuery(datas, queryidname , 'expeople', function (err, datas) {
                                                if(err){
                                                    res.json(err);
                                                    return;
                                                }
                                                if(datas == false){ //select 결과 row 0일때 처리
                                                    res.json({ success : 0 , message : '데이터 없음', result : null});
                                                    return;
                                                }
                                                //  console.log('첫번째 처리 성공' , datas[0].memberGender);
                                                callback(null, datas[0]);
                                            })
                                        },
                                        function(datas, callback) {
                                            if( datas[0].cnt > 0) {
                                                console.log('datas[0].privateRoomNo',privateRoomNo);
                                            } else {
                                                var queryidname = 'createPrivateChat';
                                                afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) { //1:1 채팅방 생성
                                                    if(err){
                                                        res.json(err);
                                                        return;
                                                    }
                                                    if(datas.affectedRows == 0){
                                                        res.json(err);
                                                        return;
                                                    }
                                                    console.log('채팅방생성됨');
                                                    callback(null, '1');
                                                });
                                            }

                                        }
                                    ],	function(err, results) {
                                        callback(null, '1');
                                    }
                                );
                            }
                        ],	function(err, results) {
                            callback(null, '1');
                        }
                    );
                } else { //캐시가 불충분할경우
                    //   console.log('여자다');
                    callback(null, '0');
                }
            }
        ],	function(err, results) {
            res.json(util.successCode(res, results));
        }
    );

    var cr = util.createValueObject('ChatRoom');
    var m = util.createValueObject('Member');
    var c = util.createValueObject('Cash');

    //res.json(util.successCode(res, {
    //    chatroomNo : cr.ChatRoom().chatroomNo,
    //    cashAmount : c.Cash().cashAmount
    //}));

});

module.exports = router;