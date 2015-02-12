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
                } else { //캐시가 불충분할경우
                    //   console.log('여자다');
                    callback(null, '0');
                }
            }
        ],	function(err, results) {
            if(results == 1){ //캐시 업데이트 성공
                //createPrivateChat 이동
            } else {
                res.json(util.successCode(res, results));
            }
            //res.json(util.successCode(res, results));
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