var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');
var del = require('del');

var nodeUtil = require('util');

var multer  = require('multer');
router.use(multer({
    dest: './public/images/',
    rename: function (fieldname, filename) {
        return filename + Date.now() + '.jpg'
    }
}));

router.post('/', function(req, res){
    console.log('ㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ');
    var profilOriginalFileName = req.files.profilOriginalFileName == undefined ? [] : req.files.profilOriginalFileName;
    var memberAdd = req.body.memberAdd;
    var memberJob = req.body.memberJob;
    var memberHobby = req.body.memberHobby;
    var profilArray = req.body.profilArray  == undefined ? [] : req.body.profilArray;;

    if( profilOriginalFileName.constructor == Object){
        console.log('오브젝트여서 배열에 담기전', profilOriginalFileName);
        profilOriginalFileName = new Array(profilOriginalFileName);
        console.log('오브젝트여서 배열에 담음', profilOriginalFileName);
    }
    console.log('원본 프로필어레이 ' , profilArray);
    if( profilArray.constructor == String){
        console.log('P오브젝트여서 배열에 담기전', profilArray);
        profilArray = new Array(profilArray);
        console.log('P오브젝트여서 배열에 담음', profilArray);
    }
    console.log('프로필업데이트 file', req.files);
    console.log('프로필업데이트 body', req.body);
  console.log('빈 배열에 담음', profilOriginalFileName);

    /*프로필업데이트 body { memberJob: 'ㅡㅡㅡ',
     memberHobby: '쇼핑',
     memberAdd: '경기',
     profilArray: '/storage/emulated/0/temp_1423724729' }
     */
    var kk = 0;
    var temp;
    var indexCheck = [];
    var deleteFileIndex = [];
    var tempData;
    global.pool.getConnection(function (err, conn) {

        conn.beginTransaction(function (err) {

            async.waterfall([

                function (callback) {
                  console.log('워터폴1111111111111111');
                    afeelQuery.afeelQuery([req.session.memberNo], 'selectIndexThumbnail', 'profil', function (err, datas) {
                        /*          if(err){
                         //callback();
                         return;
                         }*/
                        var ii = 0;
                        //*arr.push(fArry.originalname);
                        var profilFileLength = profilArray.length;
                        var count = 0;
                        var jj = 0;

                        if (profilOriginalFileName.constructor == Object) {
                            tempData = new Array(datas);
                        } else {
                            tempData = datas;
                        }

                        if(tempData == undefined){
                            tempData = [];
                        }
                        console.log('템프데이터 어레이', tempData);
                        async.eachSeries(tempData, function (deleteItem, call) {
                            /*  if(profilArray.indexOf(deleteItem.profilOriginalFileName == -1  )){
                             //indexCheck.push(profilArray.indexOf(datas[i].profilOriginalFileName));

                             deleteFileIndex.push( deleteItem.profilOriginalFileName.split('/')[8]);
                             }*/

                            if (profilArray.indexOf(deleteItem.profilOriginalFileName != -1)) {
                                //indexCheck.push(profilArray.indexOf(datas[i].profilOriginalFileName));
                                if (tempData[jj].profilOriginalFileName.indexOf(profilArray.indexOf(deleteItem.profilOriginalFileName)) == -1) {
                                    console.log('딜리트 인덱스에 푸시되는 파일 ', deleteItem.profilOriginalFileName);
                                    deleteFileIndex.push(deleteItem.profilOriginalFileName);
                                    jj++;
                                }
                            }
                            call();
                        }, function (err) {
                            console.log('딜리트 축출 마지막');
                            callback(null);
                        });

                        console.log(datas);
                        /*      for(var i = 0 ; i < profilFileLength; i++){
                         if(profilArray.indexOf(datas[i].profilOriginalFileName == -1 )){
                         //indexCheck.push(profilArray.indexOf(datas[i].profilOriginalFileName));
                         deleteFileIndex.push(datas[i].profilOriginalFileName);
                         }
                         }*/
                    })
                }, // 정상

                function (callback) {
                  console.log('워터폴2222222222222222');
                  if(profilOriginalFileName != false) {
                    async.eachSeries(deleteFileIndex, function (fileName, call) {
                      afeelQuery.afeelQuery([req.session.memberNo, nodeUtil.format(fileName)], 'deleteProfil', 'profil', function (err, datas) {
                        /*    if(err){
                         //이번에 삭제할 파일네임 :  http://54.92.4.84:3000/images/temp_14237231861423723203883.jpg
                         console.log('딜리트 프로필 ' , err);
                         //  callback(0, null);
                         return;
                         }*/
                        console.log('딜리트 파일네임 : ', deleteFileIndex);
                        console.log(fileName);
                        console.log(req.session.memberNo);

                        /*del(['/home/ubuntu/aFeel/pro/public/images/' + fileName], function (err, paths) {
                         if(err)console.error('파일 에러 = ', err );
                         console.log('파일이 지워졋다', paths);
                         });*/

                        call();
                      });
                    }, function (err) {
                      callback(null, 1)
                    });
                  }else{
                    console.log('프로필 첨부 안할떄');
                    callback(null, 1)
                  }
                }, // func end  정상



         /*       function (succesCode, callback) {
                    if(succesCode == 1){
                        afeelQuery.afeelQuery([req.session.memberNo], 'selectIndexThumbnail', 'profil', function (err, datas) {
                            *//*   if (err) {
                             console.log('셀렉트 인덱스 섬네일 ' , err);
                             //    callback(0, null);
                             return;
                             }*//*

                            callback(null, datas);

                        }); // query end
                    } // if end
                }, // func end  정상

                function (rows, callback) {
                    async.eachSeries(deleteFileIndex, function (fileName, call) {
                        afeelQuery.afeelQuery([req.session.memberNo,nodeUtil.format(fileName)], 'deleteProfil', 'profil', function (err, datas) {
                            *//*if(err){
                             //이번에 삭제할 파일네임 :  http://54.92.4.84:3000/images/temp_14237231861423723203883.jpg
                             console.log('딜리트 프로필 ' , err);
                             //  callback(0, null);
                             return;
                             }*//*
                            console.log('딜리트 파일네임 : ', deleteFileIndex);
                            console.log(fileName);
                            console.log(req.session.memberNo);

                            del(['/home/ubuntu/aFeel/pro/public/images/' + fileName], function (err, paths) {
                                if(err)console.error('파일 에러 = ', err );
                                console.log('파일이 지워졋다', paths);
                            });

                            call();
                        });
                    }, function (err) {
                        callback(null, rows)
                    });
                }, // func end 정상r

                function (rows, callback) {
                    var kk = 0;
                    var rowTemp = [];
                    var memberNoArray = [];
                    console.log('로우즈는 : ' , rows == false || rows == undefined ? 0 : rows.length);
                    console.log('프로필 파일 체크 : ' , profilOriginalFileName);
                    console.log('프로필 파일0번쨰 네임 체크 : ' , profilOriginalFileName[0].name);
                    for(var i = 0 ; i < rows == false || rows == undefined ? 0 : rows.length ; i++){
                        rowTemp.push(rows[i].profilThumbnail);
                        // memberNoArray.push(rows[i].memberNo);
                    }
                    if(rows != false || rows != undefined){
                        var ii = 0;
                        console.log('프로필어레이 랭스' , profilArray.length);
                        console.log('프로필어레이 ' , profilArray);
                        console.log('템프 값 : ' , rowTemp);
                        if(profilArray)

                            async.eachSeries(profilArray, function (item, calls) {
                                if(rowTemp.indexOf(item) != -1){
                                    console.log('이치문 if 이미 존재하는 파일이면');
                                    ii++;
                                }else {
                                    var arr = [];
                                    console.log('몇번쨰냐 인덱스 : ' + ii);
                                    arr.push(req.session.memberNo);
                                    arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[ii].name);
                                    arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[ii].name);
                                    arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[ii].name);
                                    if (ii == 0) {
                                        afeelQuery.afeelQuery(arr, 'insertProfilMain', 'profil', function (err, datas) {
                                            *//*             if (err) {
                                             console.log('인서트 프로필 메인 에러', err);
                                             //  calls(err);
                                             //   return;
                                             }*//*
                                        }); // query end
                                    } else {
                                        async.waterfall([
                                            function (call) {
                                                afeelQuery.afeelQuery([req.session.memberNo], 'countIndex', 'profil', function (err, rowCount) {
                                                    console.log("반복 체크 횟수 ", kk++);
                                                    console.log('로우카운트인덱스 ', rowCount.length);
                                                    call(null, rowCount.length); // 아래 err fun으로 호출
                                                }); // query end
                                            }, // func end

                                            function (countIndex, call) {
                                                console.log('들어오나 체크 ', countIndex);
                                                arr.push(countIndex);
                                                afeelQuery.afeelQuery(arr, 'insertProfil', 'profil', function (err, datas) {
                                                    *//*                 if (err) {
                                                     console.log('인서트 프로필 에러', err);
                                                     callback(0, null);
                                                     return;
                                                     }*//*
                                                    console.log('인서트가 되고있따', datas);
                                                    call(null, 1);
                                                }); // query end
                                            } // func end
                                        ], function (err, result) {
                                            //  calls();
                                            console.log('엘즈 리절트문');
                                        }) // warterfall end
                                    } // else end
                                    ii++;
                                    kk++;
                                    calls();
                                } // 상위 else end
                            }, function (err) {
                                if(err){
                                    console.log('콜백 지옥 에러야');
                                }
                            }) // eachSerise end


                    }else{ // if end
                        console.log('아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅇㅇㅇㅇㅏ');

                    }
                    callback(null, 1);
                } // func end
              */

               /* function (row, callback) {
                    var temps = tempData;

                    console.log( tempData.constructor === Array ? '어레이' : '어레이가 아니다');
                    console.log('템프 : ' + temps);
                    console.log('프로필 파일 최종 : ' + profilOriginalFileName);
                    console.log('프로필 파일 0번째 : ' + profilOriginalFileName[0]);
                    console.log('프로필 어레이 랭스 : ' + profilOriginalFileName.length);
                    if( profilOriginalFileName.constructor == Object){
                        profilOriginalFileName = new Array(profilOriginalFileName);
                        console.log('마지막 콜백에서 어레이로 변환중 오브젝트를');
                    }
                    var a = [];
                    async.each(temps, function (item, call) {
                        a.push(item.profilOriginalFileName);
                        call();
                    });



                    console.log('a의 값 : ' + a);
                    var ii = 0;
                    var jj = 0;
                    var arr = [];
                    async.eachSeries(profilArray, function (item, call) {


                        var index = a.indexOf(item);
                        //var index = temps[ii].profilOriginalFileName.indexOf(item);
                        console.log('이치 ii : ' + ii + ' , index : ' + index  + ' ,  jj : ' + jj  + ' , 비교값 : ' + item);

                        if( index == -1 && ii == 0) {
                            arr = [];
                            arr.push(req.session.memberNo);
                            arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[jj].name);
                            arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[jj].name);
                            arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[jj].name);
                            afeelQuery.afeelQuery(arr, 'insertProfilMain', 'profil', function (err, datas) {
                                jj++;
                                ii++;
                                call();
                            });
                        }else if( index != -1 && ii == 0){
                            arr = [];
                            arr.push(req.session.memberNo);
                            arr.push( item);
                            arr.push( item);
                            arr.push( item);
                            afeelQuery.afeelQuery(arr, 'insertProfilMain', 'profil', function (err, datas) {
                                ii++;
                                call();
                            });
                        }else if( index == -1 && ii != 0){
                            arr = [];
                            arr.push(req.session.memberNo);
                            arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[jj].name);
                            arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[jj].name);
                            arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[jj].name);
                            arr.push( jj);
                            afeelQuery.afeelQuery(arr, 'insertProfil', 'profil', function (err, datas) {
                                jj++;
                                ii++;
                                call();
                            });
                        }else if( index != -1 && ii != 0){
                            arr = [];
                            arr.push(req.session.memberNo);
                            arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[jj].name);
                            arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[jj].name);
                            arr.push( 'http://54.92.4.84:3000/images/' + profilOriginalFileName[jj].name);
                            arr.push( ii);
                            afeelQuery.afeelQuery(arr, 'insertProfil', 'profil', function (err, datas) {
                                ii++;
                                call();
                            });
                        }

                         // if end

                    }, function (err) {
                        callback(null, 1);
                    });

                }*/

                function (row, callback) {
                  console.log('워터폴3333333333333333');
                  console.log('프로필 : ' + profilOriginalFileName);
                    if(profilOriginalFileName != false) {
                      var arr = [];
                      arr.push(req.session.memberNo);
                      arr.push('http://54.92.4.84:3000/images/' + profilOriginalFileName[0].name);
                      arr.push('http://54.92.4.84:3000/images/' + profilOriginalFileName[0].name);
                      arr.push('http://54.92.4.84:3000/images/' + profilOriginalFileName[0].name);
                      afeelQuery.afeelQuery(arr, 'insertProfilMain', 'profil', function (err, datas) {
                        callback(null);
                      });
                    }else{
                      callback(null);
                    }

                },

                function (callback) {
                  console.log('워터폴4444444444444');
                    /*memberJob: 'ㅡ',
                      memberHobby: '음악듣기',
                      memberAdd: '서울',*/
                    afeelQuery.afeelQuery([memberJob, memberHobby, memberAdd, req.session.memberNo], 'updateMemberProfil', 'member', function (err, datas) {
                        if(err)console.error(err);

                        console.log('맴버 업데이트 쿼리 : ' , memberJob + ' , ' + memberHobby + ' , ' + memberAdd  + ' , ' + req.session.memberNo);
                        callback(null,1);
                    });
                }

            ], function(err, result){
                if(err == 0){
                    conn.rollback(function (err) {
                        console.log('프로필 업데이트 롤백 중..');
                        res.json({success:0, message:'프로필 수정에 실패했습니다', result : null});
                        conn.release();
                    })
                }

                if(result == 1){
                    conn.commit(function () {
                        console.log('프로필 업데이트 커밋 중..');
                        res.json(util.successCode(res, 'success'));
                        conn.release();
                    })
                }
            })

        }); // 커넥션
    }); // 트랜젝션
}) // get 종료
/*});*/
module.exports = router;