var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

// 이메일 인증
router.post('/', function(req, res) {

  var email = require('emailjs/email'); //주의사항!!

  var server = email.server.connect({
    user: 'luume12@gmail.com',
    password: '비번',   //내 비번!!!
    host: 'smtp.gmail.com',
    ssl: true
  });

  server.send({
    text : 'i hope eat something',
    from : 'you <luume12@gmail.com>',
    to : 'lee <darkones@naver.com>, lcb <darkkekeke@daum.net>',
    cc : 'ccl <hacit@naver.com>',
    subject : 'text email',
    attachment:
      [
        {data:"<html>i<i>hope</i> eat something!, <a href='http://www.gogle.co.kr'/>check</a>",
          alternative:true}
      ]
  }, function(err, message){console.log(err || message); });
  res.json(util.successCode(res, 'success'));

});

module.exports = router;
