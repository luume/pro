var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var email = require('emailjs/email');

// 이메일 인증
router.post('/', function(req, res) {

    var memberEmail = req.body.memberEmail;

    var server = email.server.connect({
        user: 'afeelco@gmail.com',
        password: 'afeel123',   //내 비번!!!
        host: 'smtp.gmail.com',
        ssl: true
    });
    var password = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var tempPwd = 0;
    var pwd = '';

    for(i=0; i<4; i++){
        var tempPwd = password[Math.ceil(Math.random()*35)]

        pwd += tempPwd
    }
    //console.log('pp',password);
    server.send({
        text : '임시 비밀번호',
        from : 'aFeel <afeelco@gmail.com>',
        to : memberEmail,
        //cc : 'ccl <hacit@naver.com>',
        subject : '회원님의 임시 비밀번호 입니다.',
        attachment:
            [
                {data:"<html><i>임시 비밀번호: </i>"+pwd+"</html>",
                    alternative:true}
            ]
    },
        function(err, message)
        {console.log(err || message);}
    );
    res.json(util.successCode(res, '[success]'));

});

module.exports = router;
