var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

var async = require('async');
var easyimg = require('easyimage');

var path = require('path');

// 회원가입
router.post('/', function(req, res) {
    var memberEmail = req.body.memberEmail;
    var memberName = req.body.memberName;
    var memberNick = req.body.memberNick;
    var memberPw = req.body.memberPw;
    var memberGender = req.body.memberGender;
    var memberBirth = req.body.memberBirth;
    var memberHobby = req.body.memberHobby;
    var memberHeight = req.body.memberHeight;
    var memberAdd = req.body.memberAdd;
    var memberJob = req.body.memberJob;
    var profilOriginalFileName = req.files.profilOriginalFileName;
    console.log('profilOriginalFileName의 값 = ', profilOriginalFileName);


    var varibleCheck = function (test, num) {
        if(test.length > num ){
            return;
        }
    }

    var errs;
    var datas = [];
    var arr = [];
    datas.push(memberEmail);
    datas.push(memberName);
    datas.push(memberNick);
    datas.push(memberPw);
    datas.push(memberGender);
    datas.push(memberBirth);
    datas.push(memberHobby);
    datas.push(parseInt(memberHeight));
    datas.push(memberAdd);
    datas.push(memberJob);
    global.queryName = 'member';
    var queryidname = 'signupMember';

    global.pool.getConnection(function (err, conn) {

        conn.beginTransaction(function (err) {

            async.waterfall([
                function (callback) {
                    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
                        if(err){
                            //  res.json(err);
                            //return;
                            console.log('first1 err' , err);
                            callback({success:0, message:'회원가입에 실패하였습니다.(DB에러)', result:null},null);
                            //   global.afeelCon.rollback();
                            return;
                        }

                        console.log('first 1', '퍼스트1 성공');
                        callback(null); // 다음로 넘김

                    });
                },  // 1번쨰 워터폴 종료

                function (callback) {
                    afeelQuery.afeelQuery([memberEmail], 'selectMemberNo' , function (err, selectNo) {
                        if (err) {
                            console.log('first2 err', err);
                            conn.rollback();
                            callback({success: 0, message: '회원가입에 실패하였습니다.(DB에러)', result: null}, null)
                            return;
                        }

                        if (selectNo == false) {
                            conn.rollback();
                            callback({success: 0, message: '회원가입에 실패하였습니다.(DB에러)', result: null}, null)
                            return;
                        }

                        console.log('first 2' + '퍼스트2 성공' + selectNo[0].memberNo);
                        //console.log('first 2' + '퍼스트2 성공' + selectNo[0][''+memberNo+'']);
                        callback(null, selectNo[0].memberNo); // 다음로 넘김
                    });
                }, // 2번쨰 워터폴 종료

                function (selNo,callback) {
                    global.queryName = 'profil';
                    console.log('여기까진 1111111111', selNo);
                    console.log('여기까진 3333333333', profilOriginalFileName.length);
                    // console.log('copy 데이터', Object.keys(req.files.profilOriginalFileName));
                    if( profilOriginalFileName.constructor == Object){
                        console.log('오브젝트여서 배열에 담기전', profilOriginalFileName);
                        profilOriginalFileName = new Array(profilOriginalFileName);
                        console.log('오브젝트여서 배열에 담음', profilOriginalFileName);
                     }
                    var k =0;
                    global.queryName = 'profil';
                    async.each(profilOriginalFileName, function (fArry, callback) {

                        console.log('셀값 ' , selNo);
                        console.log(fArry);
                        arr.push(selNo);
                        arr.push(fArry.originalname);
                        arr.push(fArry.name);
                        arr.push(fArry.name.split('.')[0] + '-thumbnail.' +  fArry.name.split('.')[1]);
                        //arr.push(fArry.originalname);
                        var destPath = '/home/ubuntu/test/pro/public/images/' + fArry.name.split('.')[0] + '-thumbnail.' +  fArry.name.split('.')[1];
                        console.log('패스는',  destPath);
                        easyimg.thumbnail({
                            src:fArry.path, dst : destPath,
                            width:70, height:70,
                            x:0, y:0
                        }).then(function (file) {
                            console.log(file);
                        });


                        if(k == 0){
                            afeelQuery.afeelQuery(arr, 'insertProfilMain' , function (err, a2) {
                                console.log('메인프로필입니다.', arr);
                                if (err) {
                                    conn.rollback();
                                    errs = {success: 0, message: '회원가입에 실패하였습니다.(DB에러)', result: null};
                                    return;
                                }
                                arr = [];
                            }); // query end
                        }else{
                            afeelQuery.afeelQuery(arr, 'insertProfil' , function (err, a2) {
                                console.log('no메인프로필입니다.', arr);
                                if (err) {
                                    conn.rollback();
                                    errs = {success: 0, message: '회원가입에 실패하였습니다.(DB에러)', result: null};
                                    return;
                                }
                                console.log('성공' + k);
                                arr = [];
                            }); // query end
                        }

                        k++;
                        callback(); // 아래 err fun으로 호출
                    }, function(err){

                        console.log('이치에서 콜백을 호출하고있습니당...');
                        console.log('워터폴에서 콜백을 호출하고있습니당...');
                        callback(null, 1);
                    });


                } // 3번쨰 워터폴 종료
            ],
                function (err, result) {
                    console.log('마지막 처리부분');
                    if(result == 1){
                        console.log('커밋직전');
                        conn.commit(function (err) {
                            if(err){
                                conn.rollback();
                            }
                        });
                    }
                }
            ); // 워터폴 종료지점
        }); // 트랜잭션 종료

    });



});
module.exports = router;











/*

 for(var i = 0 ; i < Object.keys(req.files.profilOriginalFileName).length; i++){
 (function () {



 if( i == 0 ){
 console.log(i + '번쨰 ' , profilOriginalFileName[i].originalname);
 afeelQuery.afeelQuery([selNo, profilOriginalFileName[i].originalname,  profilOriginalFileName[i].name,  profilOriginalFileName[i].name.split('.')[0] + '-thumbnail.' +  profilOriginalFileName[i].name.split('.')[1]], 'insertProfilMain' , function (err, a2) {
 if(err){
 console.error(i + '번쨰에서 에러 ㅅㅂ', err);
 callback({success:0, message:'회원가입에 실패하였습니다.(DB에러)', result:null},null)
 return;
 }


 if(i == profilOriginalFileName.length -1) {
 callback(null, a2);
 }
 });  // 첫번째 파일은 메인 프로필사진
 }else{
 console.log(i + '번쨰 ' , profilOriginalFileName[i].originalname);
 afeelQuery.afeelQuery([ [selNo, profilOriginalFileName[i].originalname,  profilOriginalFileName[i].name,  profilOriginalFileName[i].name.split('.')[0] + '-thumbnail.' +  profilOriginalFileName[i].name.split('.')[1]] ], 'insertProfil' , function (err, a3) {
 if(err){
 console.error('err', err);
 callback({success:0, message:'회원가입에 실패하였습니다.(DB에러)', result:null},null)
 return;
 }


 if( i == Object.keys(req.files.profilOriginalFileName).length -1) {
 callback(null, a3);
 }
 });  // 2번째부턴 사진등록만
 }
 })();
 } // for문 종료*/


//callback(null,'1');