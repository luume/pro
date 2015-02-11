var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var email = require('emailjs/email');

// 이메일 인증
router.post('/', function(req, res) {

    var memberEmail = req.body.memberEmail;
    
    var server = email.server.connect({
        user: 'khj98291@gmail.com',
        password: 'fdfd04814',   //내 비번!!!
        host: 'smtp.gmail.com',
        ssl: true
    });

    server.send({
        text : 'i hope eat something',
        from : 'you <khj98291@gmail.com>',
        to : 'lee <dragojin@naver.com>, lcb <khj98291@gmail.com>',
        //cc : 'ccl <hacit@naver.com>',
        subject : 'text email',
        attachment:
            [
                {data:"<html>i<i>hope</i> eat something! check</html>",
                    alternative:true}
            ]
    }, function(err, message){console.log(err || message); });
    res.json(util.successCode(res, 'success'));


});

module.exports = router;
