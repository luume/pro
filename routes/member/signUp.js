var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

// 회원가입
router.post('/', function(req, res) {

  var errobj = util.variableCheck(req.body, 11);

  if(errobj == undefined){
    res.json(errobj);
    return;
  }

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
  var profilOriginalFileName = req.body.profilOriginalFileName;

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
  var isSuccess = util.emailCheck(memberEmail);
  if(!isSuccess){
    res.json({success:0, message:'email 양식 오류', result:null});
    return;
  }


  global.queryName = 'member';
  var queryidname = 'signupMember';
  console.log('datas',datas);
  afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
    if(err){
      res.json(err);
    }
    res.json(datas);
  });
  /*CREATE TABLE MEMBER (
    memberNo        INT     PRIMARY KEY  AUTO_INCREMENT,
    memberEmail     VARCHAR(20) NOT NULL,
    memberNick      VARCHAR(20) NOT NULL,
    memberTel       INT         NULL,
    memberAdd       VARCHAR(50) NOT NULL,
    memberName      VARCHAR(30) NOT NULL,
    memberGender    VARCHAR(1)  NOT NULL,
    memberBirth     VARCHAR(8)  NOT NULL,
    memberHeight    INT     NOT NULL,                                      1
    memberPw        VARCHAR(20) NOT NULL,
    memberHobby     VARCHAR(20) NOT NULL,
    memberJob       VARCHAR(20) NOT NULL,
    memberLevel     INT     NOT NULL DEFAULT 1,
    memberSmoking   VARCHAR(1)  NOT NULL,
    memberMatchCnt  INT     NOT NULL DEFAULT 0,
    memberHPYn      INT     NULL,
    memberEmailYn   INT     NOT NULL DEFAULT 0,
    memberSNSYn     INT     NULL,
    memberStMeeting DATETIME not NULL     DEFAULT now(),
    memberPushYn    INT     NOT NULL DEFAULT 0,
    memberPenalty   INT     NULL     DEFAULT 0,
    memberCash      INT     NOT NULL DEFAULT 0,
    memberBestQ     INT     NULL,
    memberWithdraw  INT     NULL     DEFAULT 0,
    memberWithdrawReason VARCHAR(5000) NULL,
    memberToken	VARCHAR(5000) 	   NULL
  );
*/
/*
  Member      memberEmail: 이메일
  Member      memberName: 실명
  Member      memberNick: 닉네임
  Member      memberPw: 비밀번호
  Member      memberGender: 성별
  Member      memberBirth: 생년월일
  Member      memberHobby: 취미/특기
  Member      memberHeight : 키
  Member      memberAdd : 거주지
  Member      memberJob : 직업
  Profil           profilOriginalFileName: 프로필 사진 파일명*/

  /*var m = util.createValueObject('Member');

  var p = util.createValueObject('Profil');

  res.json(util.successCode(res,
    {
      memberEmail : m.Member().memberEmail,
      memberName : m.Member().memberName,
      memberNick : m.Member().memberNick,
      memberPw : m.Member().memberPw,
      memberTel : m.Member().memberTel,
      memberGender : m.Member().memberGender,
      memberBirth : m.Member().memberBirth,
      memberHobby : m.Member().memberHobby,
      memberHeight  : m.Member().memberHeight ,
      memberAdd   : m.Member().memberAdd  ,
      memberJob    : m.Member().memberJob   ,
      profilOriginalFileName    : p.Member().profilOriginalFileName
    }
  ));*/

});

module.exports = router;
