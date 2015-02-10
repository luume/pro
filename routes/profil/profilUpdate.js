var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');
router.post('/', function(req, res){

    var profilOriginalFileName = req.files.profilOriginalFileName;
    var memberAdd = req.body.memberAdd;
    var memberJob = req.body.memberJob;
    var memberHobby = req.body.memberHobby;



   global.pool.getConnection(function (err, conn) {

        conn.beginTransaction(function (err) {

            async.waterfall([

                function (callback) {
                    afeelQuery.afeelQuery([], 'updateMember', 'member', function (err, datas) {
                        if(err){
                           callback(0, null);
                        }
                        console.log('datas ? ' , datas);
                        callback(null, 1);
                    });
                }, // 첫번쨰 워터폴 종료

                function (successCode, callback) {
                    console.log('성공코드 ,', successCode);
                   afeelQuery.afeelQuery([], 'updateProfil', 'profil', function (err, datas) {
                       if(err){
                           callback(0, null);
                       }

                       callback(null, 1);

                    });
                } // 2번쨰 워터폴 종료

            ], function (err, successCode) {
                if(err == 0){
                    conn.rollback(function (err) {
                        console.log('프로필 업데이트 롤백 중..');
                        res.json({success:0, message:'프로필 수정에 실패했습니다', result : null});
                        conn.release();
                    })
                }

                if(successCode == 1){
                    conn.commit(function () {
                        console.log('프로필 업데이트 커밋 중..');
                        res.json(util.successCode(res, 'success'));
                        conn.release();
                    })
                }
            });

        });
    });
});
module.exports = router;