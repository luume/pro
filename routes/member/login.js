var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.post('/', function(req, res){

    var memberEmail = req.body.memberEmail;
    var memberPw = req.body.memberPw;

    var datas = [];
    datas.push(memberEmail);
    datas.push(memberPw);

    global.queryName = 'member';
    var queryidname = 'loginMember';
    console.log('datas',datas);
    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        console.log('dd',datas.length);

        if(datas.length == 0){
            res.json({
                success : 0,
                message : '아이디 또는 비밀번호가 틀렸습니다.',
                result : null
            });
            return;
        }

        req.session.memberNo  = datas[0].memberNo;
        //console.log('세션 정보 = > ', req.session);
        console.log('dd','loginlogin');
        console.log(util.successCode(res, 'success'));
        res.json(util.successCode(res, '{success}'));
        console.log('dd','loginlogin2222222222222222');

    });


});

module.exports = router;