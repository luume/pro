var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

// 회원가입
router.post('/', function(req, res) {

  var cir_name = req.body.cir_name;
  var datas = [];
  datas.push(cir_name);

  global.queryName = 'query';
  var queryidname = 'test';
  afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
    if(err){
      res.json(err);
    }
    res.json(datas);

  });

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
