var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

// 이메일 중복 확인
router.post('/', function(req, res) {

  var memberEmail = req.body.memberEmail;

  var datas = [];
  datas.push(memberEmail);

  global.queryName = 'member';
  var queryidname = 'checkEmailMember';

  afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
    if(err){
      res.json(err);
      return;
    }
    if(datas.length == 1){
      res.json({ success : 0 , message : 'Email 중복', result : null});
      return;
    }
    else {
      res.json(util.successCode(res, '[success]'));
    }

    //res.json(util.successCode(res, datas));
  });

  //res.json(util.successCode(res, 'success'));

});

module.exports = router;
