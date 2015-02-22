var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');
var async = require('async');

router.get('/:chatroomNo', function(req, res){
    var chatroomNo = req.params.chatroomNo;
    var memberNo = req.session.memberNo;

    async.waterfall([
            function(callback) {
                var datas = [];
                datas.push(chatroomNo);
                var queryidname = 'forthWoman';
                //feeling code 및 feeling rate 가져옴
                afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    console.log('1워터폴 유어프로필', datas);
                    if(datas == false){ //select 결과 row 0일때 처리
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    //console.log('첫번째 처리 성공' , datas[0]);
                    callback(null, datas[0]);
                })

            },
            //dd
            function(memberdata, callback) {
                //console.log('memberdata.feelingCode1' , memberdata.feelingCode1);
                var memberTo = memberdata.memberNo; //상대 회원번호
                var datas = [];
                //datas.push(memberdata.feelingCode1);
                //datas.push(memberdata.feelingCode2);
                //datas.push(memberdata.feelingCode3);
                datas.push(memberTo);
                datas.push(chatroomNo);
                var queryidname = 'showRank';

                afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    callback(null, memberdata, datas[0]);
                });

            },
            //dd

            //ee
            function(memberdata, callback) {
                //console.log('memberdata.feelingCode1' , memberdata.feelingCode1);
                var memberTo = memberdata.memberNo; //상대 회원번호
                var datas = [];
                //datas.push(memberdata.feelingCode1);
                //datas.push(memberdata.feelingCode2);
                //datas.push(memberdata.feelingCode3);
                datas.push(memberTo);
                datas.push(chatroomNo);
                var queryidname = 'showRank';

                afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    callback(null, memberdata, datas[0]);
                });

            },
            //ee
            function(memberdata, rankData, callback) {
                //console.log('memberdata.feelingCode1' , memberdata.feelingCode1);
                var datas = [];
                //datas.push(memberdata.feelingCode1);
                //datas.push(memberdata.feelingCode2);
                //datas.push(memberdata.feelingCode3);
                datas.push(memberdata.memberNo);
                var queryidname = 'showProfilThumbnail';
                console.log('rankData',rankData.rank);
                afeelQuery.afeelQuery(datas, queryidname , 'profil', function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    var arr = [];
                    async.each(datas, function (row, callback) {
                        arr.push(row.profilThumbnail);

                        callback();

                    }, function(err){
                        profilThumbnail = arr;
                        //temp = memberdata;
                        datas[0].memberNo = memberdata.memberNo;
                        datas[0].memberName = memberdata.memberName;
                        datas[0].memberGender = memberdata.memberGender;
                        datas[0].memberNick = memberdata.memberNick;
                        datas[0].memberJob = memberdata.memberJob;
                        datas[0].memberHobby = memberdata.memberHobby;
                        datas[0].memberAdd = memberdata.memberAdd;
                        datas[0].memberAge = memberdata.memberBirth;
                        datas[0].memberHeight = memberdata.memberHeight;
                        datas[0].memberEmailYn = memberdata.memberEmailYn;
                        datas[0].memberSNSYn = memberdata.memberSNSYn;
                        datas[0].memberRank = rankData.rank;
                        datas[0].profilThumbnail = arr;
                        //temp = arr;

                        callback(null, datas[0]);
                        //res.json({success:1, message:'ok', result:});
                    });

                });

            }
        ],	function(err, results) {
            //console.log('최종 처리');
            //res.json({success:1,message:'ok',result:{results}});

            res.json(util.successCode(res, results));
        }
    );

});





module.exports = router;