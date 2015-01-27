var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

// 랜덤 소개 받기
router.post('/:memberNo', function(req, res) {
  var memberNo = req.params.memberNo;
  if(memberNo == "" || memberNo == undefined){
    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
    return;
  }
  res.json(util.successCode(res, 'success'));

});

module.exports = router;
