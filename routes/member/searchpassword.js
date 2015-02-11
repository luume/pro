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
    var password = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var tempPwd = 0;

    for(i=0; i<4; i++){
        var tempPwd = password[Math.ceil(Math.random()*35)]
        console.log(tempPwd);
    }

    //console.log('pp',password);
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
