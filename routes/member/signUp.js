var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

var async = require('async');

// 회원가입
router.post('/', function(req, res) {


 // var errobj = {};
 // errobj = util.variableCheck(req.body, 11);
 ///// console.log('하하호호 ' , req);
 // if(errobj != undefined){
 //   res.json(errobj);
 //   return;
 // }
  console.log('파일 객체ss', req);
  console.log('파일 객체ss', req.files);

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

  global.queryName = 'member';
  var queryidname = 'signupMember';
  console.log('datas',datas);
  /*async.waterfall([

    function (callback) {
      afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
          res.json(err);
        }
        console.log('changed row: ',datas.affectedRows);
        if(datas.affectedRows == 1)
          //res.json(util.successCode(res, 'success'));
        else
          res.json({success:0, message:'회원가입에 실패하였습니다.(DB에러)', result:null});
        
        callback(null, datas);
        
      });
    },

    function (firstData, callback) {

*//*

      afeelQuery.afeelQuery(datas, 'insertProfil' , function (err, datas) {
        if(err){
          res.json(err);
        }
        console.log('changed row: ',datas.affectedRows);
        if(datas.affectedRows == 1)
        //res.json(util.successCode(res, 'success'));
        else
        res.json({success:0, message:'회원가입에 실패하였습니다.(DB에러)', result:null});

        callback(null, datas);*//*

      });
    }

  ], function () {

  });*/
 

});

module.exports = router;
