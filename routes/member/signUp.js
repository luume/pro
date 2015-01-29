var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

// 회원가입
router.post('/', function(req, res) {

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

  //var datas = [];
  datas.push(memberEmail);
  datas.push(memberName);
  datas.push(memberNick);
  datas.push(memberPw);
  datas.push(memberGender);
  datas.push(memberBirth);
  datas.push(memberHobby);
  datas.push(memberHeight);
  datas.push(memberAdd);
  datas.push(profilOriginalFileName);

  global.queryName = 'query';
  var queryidname = 'test';
  afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
    if(err){
      res.json(err);
    }
    res.json(datas);

  });


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
