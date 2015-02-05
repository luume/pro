var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');


// 앱 홈 화면
router.get('/', function(req, res) {

  var memberNo = req.session.memberNo;

  global.queryName = 'chat';
  var queryidname = 'chatMain';

  afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
    if(err){
      res.json(err);
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
