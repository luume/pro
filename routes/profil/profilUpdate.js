var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');
var del = require('del');

router.post('/', function(req, res){

    var profilOriginalFileName = req.files.profilOriginalFileName;
    var memberAdd = req.body.memberAdd;
    var memberJob = req.body.memberJob;
    var memberHobby = req.body.memberHobby;
    var profilArray = req.body.profilUpdate;
    console.log('프로필업데이트 file', req.files);
    console.log('프로필업데이트 body', req.body);

    var temp;
    var indexCheck = [];
   global.pool.getConnection(function (err, conn) {

        conn.beginTransaction(function (err) {

            async.waterfall([

                function (callback) {
                    afeelQuery.afeelQuery(datas, 'selectIndexThumbnail', 'profil', function (err, datas) {
                        if(err){
                            callback(0, null);
                            return;
                        }
                        var ii = 0;
                        //*arr.push(fArry.originalname);
                        var profilFileLength =  profilArray.length;
                        var count = 0;

                        for(var i = 0 ; i < profilFileLength; i++){
                            if(profilArray.indexOf(datas[i].profilOriginalFileName)){
                                indexCheck.push(profilArray.indexOf(datas[i].profilOriginalFileName));
                            }
                        }
  

                        async.eachSeries(profilArray, function (index, call) {
                            if(ii == tem)
                            afeelQuery.afeelQuery(datas, 'updateProfil', 'profil', function (err, datas) {
                                if(err){
                                    callback(0, null);
                                    return;
                                }
                                console.log('datas ? ' , datas);
                                callback(null, 1);
                            });

                            call();
                        }, function (err) {

                        });

                        console.log('datas ? ' , datas);
                        callback(null, 1);
                    });
                },


                function (callback) {
                    var datas = [];
                    datas.push(memberHobby);
                    datas.push(memberJob);
                    datas.push(memberAdd);
                    datas.push(req.session.memberNo);
                    afeelQuery.afeelQuery(datas, 'selectAllThumbnail', 'profil', function (err, datas) {
                        if(err){
                            callback(0, null);
                            return;
                        }
                        var ii = 0;
                        async.each(datas, function (item, call) {

                            item.profilOriginalFileName = profilArray[ii];
                            ii++;
                            call();
                        }, function (err) {

                        });

                        console.log('datas ? ' , datas);
                        callback(null, 1);
                    });
                }, // 0번쨰 워터폴 종료

                function (callback) {
                    var datas = [];
                    datas.push(memberHobby);
                    datas.push(memberJob);
                    datas.push(memberAdd);
                    datas.push(req.session.memberNo);
                    afeelQuery.afeelQuery(datas, 'updateMember', 'member', function (err, datas) {
                        if(err){
                           callback(0, null);
                            return;
                        }
                        console.log('datas ? ' , datas);
                        callback(null, 1);
                    });
                }, // 첫번쨰 워터폴 종료

                function (successCode, callback) {
                    if(successCode == 1){
                        afeelQuery.afeelQuery([req.session.memberNo], 'selectAllThumbnail', 'profil', function (err, datas) {
                            // /home/ubuntu/test/pro/public/images/temp_14235530671423553081199-thumbnail..jpg
                            async.each(datas, function (index, call) {
                                del(['/home/ubuntu/test/pro/public/images/' + index.Thumbnail], function (err, paths) {
                                    //console.log('파일이 지워졋다', paths);
                                });
                                call();
                            }, function(err){
                                callback(null, 1)
                            });

                        });

                    }
                }, // 2번째 워터폴 종료

                function (successCode, callback) {
                    console.log('성공코드 ,', successCode);
                   afeelQuery.afeelQuery([req.session.memberNo], 'deleteProfil', 'profil', function (err, datas) {
                       if(err){
                           callback(0, null);
                           return;
                       }

                       callback(null, 1);

                    });
                }, // 3번쨰 워터폴 종료

                function (successCode, call) {

                    if(successCode == 1){

                        if( profilOriginalFileName.constructor == Object){
                            console.log('오브젝트여서 배열에 담기전', profilOriginalFileName);
                            profilOriginalFileName = new Array(profilOriginalFileName);
                            console.log('오브젝트여서 배열에 담음', profilOriginalFileName);
                        }

                        var k = 0;
                        async.eachSeries(profilOriginalFileName, function (fArry, callback) {

                            console.log('셀값 ' , selNo);
                            console.log(fArry);
                            var arr = [];
                            arr.push(selNo);
                            arr.push(fArry.originalname);
                            arr.push(fArry.name);
                            arr.push(fArry.name.split('.')[0] + '-thumbnail.' +  '.jpg');
                            //arr.push(fArry.originalname);
                            var destPath = '/home/ubuntu/test/pro/public/images/' + fArry.name.split('.')[0] + '-thumbnail.' +   '.jpg';
                            console.log('패스는',  destPath);

                            if(k == 0){
                                afeelQuery.afeelQuery(arr, 'insertProfilMain' , 'profil', function (err, a2) {
                                    console.log('메인 k', k);
                                    console.log('메인프로필입니다.', arr);
                                    if (err) {
                                        conn.rollback();
                                        errs = {success: 0, message: '회원가입에 실패하였습니다.(DB에러)', result: null};
                                        return;
                                    }
                                    callback(); // 아래 err fun으로 호출
                                }); // query end
                            }else{
                                afeelQuery.afeelQuery(arr, 'insertProfil' , 'profil', function (err, a2) {
                                    console.log('no메인프로필입니다.', arr);
                                    console.log('no메인 k.', k);
                                    if (err) {
                                        conn.rollback();
                                        errs = {success: 0, message: '회원가입에 실패하였습니다.(DB에러)', result: null};
                                        return;
                                    }
                                    console.log('성공' + k);
                                    callback(); // 아래 err fun으로 호출
                                }); // query end
                            }
                            k++;

                        }, function(err){
                            console.log('이치에서 콜백을 호출하고있습니당...');
                            console.log('워터폴에서 콜백을 호출하고있습니당...');
                            call(null, 1);
                        });

                    }

                }

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