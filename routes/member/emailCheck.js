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
    //console.log(datas);
    //if(err){
    //  res.json(err);
    //  return;
    //}
    if(datas == undefined){
      res.json(util.successCode(res, '[success]'));
    } else if(datas.length > 0){
      res.json({ success : 0 , message : 'Email 중복', result : null});
      return;
    }
    else {
      res.json(util.successCode(res, '[success]'));
    }
  });

});
module.exports = router;
