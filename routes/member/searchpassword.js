var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
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
                {data:"<html><i>임시 비밀번호: </i>"+pwd+"</br>꼭! 비밀번호 변경을 하신 후 사용해 주세요.</html>",
                    alternative:true}
            ]
    },
        function(err, message)
        {console.log(err || message);}
    );
    var datas = [];
    datas.push(pwd);
    datas.push(memberEmail);

    global.queryName = 'member';
    var queryidname = 'editPasswordMemberByEmail';
    //비밀번호 Update
    global.pool.getConnection(function (err, conn) {
        conn.beginTransaction(function (err) {
            afeelQuery.afeelQuery(datas, queryidname , 'member', function (err, row) {
                if(err){
                    res.json(err);
                    return;
                }
                if(row.affectedRows == 1){
                    res.json(util.successCode(res, '[success]'));
                } else {
                    res.json({ success : 0 , message : 'fail', result : null});
                    return;
                }
            });
        }); // 트랜잭션 종료
    });



});

module.exports = router;
