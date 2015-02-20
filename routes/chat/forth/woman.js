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
            function(memberdata, callback) {
                //console.log('memberdata.feelingCode1' , memberdata.feelingCode1);
                var datas = [];
                //datas.push(memberdata.feelingCode1);
                //datas.push(memberdata.feelingCode2);
                //datas.push(memberdata.feelingCode3);
                datas.push(memberdata.memberNo);
                var queryidname = 'showProfilThumbnail';

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
                        temp = memberdata;
                        datas[0].profilThumbnail = arr;
                        temp.aaa = arr;

                        callback(null, memberdata[0]);
                        //res.json({success:1, message:'ok', result:});
                    });

                });

            }
        ],	function(err, results) {
            //console.log('최종 처리');

            res.json(util.successCode(res, results));
        }
    );

});





module.exports = router;