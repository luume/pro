var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

//var graph = require('fbgraph');
var fbgraph = require('fbgraphapi');
/*
router.use(fbgraph.auth( {
  appId : "1535434773399452",
  appSecret : "dd3dd990afd2bd570ab00631a3c8a652",
  redirectUri : "http://54.92.4.84:80/"
}));*/

// 회원가입(SNS 연동)
router.post('/', function(req, res) {

  var memberToken = req.body.memberToken;
  var memberNick = req.body.memberNick;
  var memberTel = req.body.memberTel;
  var memberGender = req.body.memberGender;
  var memberBirth = req.body.memberBirth;
  var memberHobby = req.body.memberHobby;
  var memberHeight = req.body.memberHeight;
  var memberAdd = req.body.memberAdd;
  var memberJob = req.body.memberJob;

  var m = util.createValueObject('Member');

  var p = util.createValueObject('Profil');

  var fb = new fbgraph.Facebook(memberToken);
  fb.me(function(err, me) {
    if(err)console.error('fbGraph에러입니다', err);

    console.log('fbgRaph 테스트입니다 = ', me);
  });


  res.json(util.successCode(res,
    {
      memberToken : m.Member().memberToken,
      memberNick : m.Member().memberNick,
      memberTel : m.Member().memberTel,
      memberGender : m.Member().memberGender,
      memberBirth : m.Member().memberBirth,
      memberHobby : m.Member().memberHobby,
      memberHeight  : m.Member().memberHeight ,
      memberAdd   : m.Member().memberAdd  ,
      memberJob    : m.Member().memberJob   ,
      profilOriginalFileName    : p.Member().profilOriginalFileName
    }
  ));

});

module.exports = router;
