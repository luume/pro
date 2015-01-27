var express = require('express');
var router = express.Router();

//var util = require('../../afeel/util/vo');

// 자기가한 질문으로 소개 받기
router.post('/', function(req, res) {

console.log(req.session);
  req.session.regenerate(function () {

    var uniqKey;

    var uniqSessionId = function(){
      return (function(){
        uniqKey = req.session.id;
        console.log('유닛키는 = ', uniqKey);
      });
    };

    res.send(req.session.id);
    console.log('유닛키 ', router.uniqSessionId);
  });
//  res.json(util.successCode(res, 'success'));

});


module.exports = router;

