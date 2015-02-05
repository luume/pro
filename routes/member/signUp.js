var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

var async = require('async');
var easyimg = require('easyimage');

// 회원가입
router.post('/', function(req, res) {


  // var errobj = {};
  // errobj = util.variableCheck(req.body, 11);
  ///// console.log('하하호호 ' , req);
  // if(errobj != undefined){
  //   res.json(errobj);
  //   return;
  // }



  console.log('bodyssssssss = ', req.body);
  console.log('파일 객체ss', req.files);
  console.log('길이1', Object.keys(req.files).length);
  console.log('길이2', req.files.profilOriginalFileName);
  //console.log('길이3', req.files.profilOriginalFileName.length);
  //res.json(req.files);

  //var cir_name = req.body.cir_name;
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
  console.log('profilOriginalFileName', profilOriginalFileName);
  var datas = [];
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
  //datas.push(profilOriginalFileName);
  //var isSuccess = util.emailCheck(memberEmail);
  //if(!isSuccess){
  //  res.json({success:0, message:'email 양식 오류', result:null});
  //  return;
  //}
  console.log('222222222222222');
  global.queryName = 'member';
  var queryidname = 'signupMember';
  console.log('datas', datas);

  if(Object.keys(req.files).length == 0){
    res.json({success:0, message:'파일이 null', result:null});
  }
  var mNo;
  console.log('파일길이', Object.keys(req.files.profilOriginalFileName).length);
 async.waterfall([

    function (callback) {
      afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
        //  res.json(err);
          //return;
          callback({success:0, message:'회원가입에 실패하였습니다.(DB에러)', result:null},null)
        }

        callback(null); // 다음로 넘김

      });
    },

     function (callback) {
       afeelQuery.afeelQuery([memberEmail], 'selectMemberNo' , function (err, selectNo) {
         if(err){
           //  res.json(err);
           //return;
           callback({success:0, message:'회원가입에 실패하였습니다.(DB에러)', result:null},null)
         }


         callback(null,selectNo); // 다음로 넘김

       });
     },

    function (selNo, callback) {
      global.queryName = 'profil';



      var k = 0;
      var errs;
      async.each(profilOriginalFileName[i], function (row, callback) {
        console.log('row', row);

        easyimg.thumbnail({
          src:row.path, dst :row.name.split('.')[0] + '-thumbnail.' +  row.name.split('.')[1],
          width:70, height:70,
          x:0, y:0
        }).then(function (file) {
          console.log(file);
        });

      if(k == 0){
        afeelQuery.afeelQuery([selNo, profilOriginalFileName[i].originalname,  profilOriginalFileName[i].name,  profilOriginalFileName[i].name.split('.')[0] + '-thumbnail.' +  profilOriginalFileName[i].name.split('.')[1]], 'insertProfilMain' , function (err, a2) {
          if (err) {
            console.error(i + '번쨰에서 에러 ㅅㅂ', err);
            errs = {success: 0, message: '회원가입에 실패하였습니다.(DB에러)', result: null};
          }
        });
      }else{
        afeelQuery.afeelQuery([ [selNo, profilOriginalFileName[i].originalname,  profilOriginalFileName[i].name,  profilOriginalFileName[i].name.split('.')[0] + '-thumbnail.' +  profilOriginalFileName[i].name.split('.')[1]] ], 'insertProfil' , function (err, a3) {
          if (err) {
            console.error('err', err);
            errs = {success: 0, message: '회원가입에 실패하였습니다.(DB에러)', result: null};
          }
        });
      }
        k++;

      }, function(err){
        console.log('모두 성공');
        console.log('arr', arr);
        callback(null , 1);
        //conn.release();
        //res.json({result:arr});
      });








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


      callback(null,'1');
    }

  ], function (err, result) {

     console.log('에러는', err);
     console.log('result', result);

      if(result == 1) {
        res.json({success: 1, message: 'ok', result: 'success'});
      }else{
        res.json(err);
      }
  }
);

});
module.exports = router;
