var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

// 앱 홈 화면
router.get('/', function(req, res) {

  var memberNo = req.session.memberNo;
  var datas = [];
  global.queryName = 'chat';
  var queryidname = 'chatMain';

  afeelQuery.afeelQuery([req.session.memberNo], queryidname , function (err, datas) {
    if(err){
      res.json(err);

      return;
    }
    if(datas == false){
      res.json({ success : 0 , message : '데이터 없음', result : null});

      return;
    }

    res.json(util.successCode(res, datas));
  });
  var m = util.createValueObject('Member');

  var p = util.createValueObject('Profil');

  //res.json(util.successCode(res,
  //  {
  //    memberEmail : m.Member().memberEmail,
  //    memberName : m.Member().memberName,
  //    memberBirth : m.Member().memberBirth,
  //    memberHobby : m.Member().memberHobby,
  //    memberAdd : m.Member().memberAdd,
  //    memberHeight : m.Member().memberHeight,
  //    memberJob : m.Member().memberJob,
  //    memberSnsYn : m.Member().memberSNSYn,
  //    memberHPYn : m.Member().memberHPYn,
  //    memberEmailYn : m.Member().memberEmailYn,
  //    memberStMeeting : m.Member().memberStMeeting
  //  }
  //));


});

module.exports = router;
