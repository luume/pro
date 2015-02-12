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
    var profilArray = new Array(req.body.profilArray);
    console.log('프로필업데이트 file', req.files);
    console.log('프로필업데이트 body', req.body);


    /*프로필업데이트 body { memberJob: 'ㅡㅡㅡ',
      memberHobby: '쇼핑',
      memberAdd: '경기',
      profilArray: '/storage/emulated/0/temp_1423724729' }
*/

    var temp;
    var indexCheck = [];
    var deleteFileIndex = [];
   global.pool.getConnection(function (err, conn) {

        conn.beginTransaction(function (err) {

            async.waterfall([

                function (callback) {
                    afeelQuery.afeelQuery([req.session.memberNo], 'selectIndexThumbnail', 'profil', function (err, datas) {
                        if(err){
                            callback(0, null);
                            return;
                        }
                        var ii = 0;
                        //*arr.push(fArry.originalname);
                        var profilFileLength =  profilArray.length;
                        var count = 0;

                        for(var i = 0 ; i < profilFileLength; i++){
                            if(profilArray.indexOf(datas[i].profilOriginalFileName == -1 )){
                                //indexCheck.push(profilArray.indexOf(datas[i].profilOriginalFileName));
                                deleteFileIndex.push(datas[i].profilOriginalFileName);
                            }
                        }

                        async.waterfall([

                            function (callback) {
                                async.eachSeries(deleteFileIndex, function (fileName, call) {
                                    afeelQuery.afeelQuery([fileName], 'deleteProfil', 'profil', function (err, datas) {
                                        if(err){
                                            console.log('딜리트 파일네임 : ', deleteFileIndex);
                                            console.log('이번에 삭제할 파일네임 : ', fileName);
                                            console.log('딜리트 프로필 ' , err);
                                            callback(0, null);
                                            return;
                                        }
                                        console.log('datas ? ' , datas);

                                        del(['/home/ubuntu/aFeel/pro/public/images/' + fileName], function (err, paths) {
                                            if(err)console.error('파일 에러 = ', err );
                                            console.log('파일이 지워졋다', paths);
                                        });

                                        call();
                                    });
                                }, function (err) {
                                    callback(null, 1)
                                });
                            }, // func end


                            function (succesCode, callback) {
                                if(succesCode == 1){
                                    afeelQuery.afeelQuery([req.session.memberNo], 'selectIndexThumbnail', 'profil', function (err, datas) {
                                    if (err) {
                                        console.log('셀렉트 인덱스 섬네일 ' , err);
                                        callback(0, null);
                                        return;
                                    }

                                    callback(null, datas);

                                }); // query end
                                } // if end
                            }, // func end


                            function (rows, callback) {

                                var rowTemp = [];
                                var memberNoArray = [];
                                for(var i = 0 ; i < rows.length; i++){
                                    rowTemp.push(rows[i].profilThumbnail);
                                    memberNoArray.push(rows[i].memberNo);
                                }
                                if(rows != false || rows != undefined){
                                    var ii = 0;
                                    async.eachSeries(profilArray, function (item, calls) {
                                        if(rowTemp.indexOf(item) != -1){

                                        }else{
                                            var arr = [];
                                            arr.push(memberNoArray[ii]);
                                            arr.push('http://54.92.4.84:3000/images/' + item + Date.now() +  '.jpg');
                                            arr.push('http://54.92.4.84:3000/images/' + item + Date.now() +  '.jpg');
                                            arr.push('http://54.92.4.84:3000/images/' + item + Date.now() +  '.jpg');
                                            if(ii == 0){
                                                afeelQuery.afeelQuery(arr, 'insertProfilMain', 'profil', function (err, datas) {
                                                    if (err) {
                                                        console.log('인서트 프로필 메인 에러' , err);
                                                       calls(err);
                                                        return;
                                                    }
                                                }); // query end
                                            }else{
                                                async.waterfall([
                                                    function (call) {
                                                        afeelQuery.afeelQuery([req.session.memberNo], 'countIndex' , 'profil', function (err, rowCount) {
                                                            console.log('로우카운트인덱스 ', rowCount.length);
                                                            calls(null, rowCount.length); // 아래 err fun으로 호출
                                                        }); // query end
                                                    }, // func end

                                                    function (countIndex, call) {
                                                        arr.push(countIndex);
                                                        afeelQuery.afeelQuery(arr, 'insertProfil', 'profil', function (err, datas) {
                                                            if (err) {
                                                                console.log('인서트 프로필 에러' , err);
                                                                callback(0, null);
                                                                return;
                                                            }
                                                            call(null, 1);
                                                        }); // query end
                                                    } // func end
                                                ], function (err, result) {
                                                  //  calls();
                                                    console.log('엘즈 리절트문');
                                                }) // warterfall end
                                            }
                                        } // if else end

                                        ii++;
                                        calls();

                                    }, function (err) {
                                        if(err){
                                            console.log('콜백 지옥 에러야');
                                        }
                                    }) // eachSerise end


                                } // if end

                            } // func end

                        ], function (err, result) {
                            console.log('마지막이치다');

                        }); // warterfall end

                        //console.log('datas ? ' , datas);
                        callback(null, 1);
                    });
                },


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

        }); // 트랜잭션 종료
    });
});
module.exports = router;