var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');


var utils = require('util');

router.post('/', function(req, res){

    var memberEmail = req.body.memberEmail;
    var memberPw = req.body.memberPw;

    var datas = [];
    datas.push(utils.format(memberEmail));
    datas.push(memberPw);

    var varibCheck = function (test ,num) {
        if(test.length > num){

        }
    }

    global.queryName = 'member';
    var queryidname = 'loginMember';
    console.log('datas',datas);
    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
            return;
        }

        if(datas == null || datas == false){
            res.json({
                success : 0,
                message : '아이디 또는 비밀번호가 틀렸습니다.',
                result : null
            });
            return;
        }
        req.session.memberNo  = datas[0].memberNo;
        //console.log('세션 정보 = > ', req.session);
        res.json( { success : 1 , message : 'ok' ,result : datas  } );

    });


});


router.post('/:memberToken', function(req, res){

    var memberToken = req.params.memberToken;

    var datas = [];
    datas.push(memberToken);

    var varibCheck = function (test ,num) {
        if(test.length > num){

        }
    }

    global.queryName = 'member';
    var queryidname = 'facebookLoginMember';
    console.log('datas',datas);
    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
            return;
        }

        if(datas == null || datas == false){
            res.json({success:0, message:'토큰이 존재하지 않습니다.', result:null});
            return;
        }else{
            req.session.memberNo  = datas[0].memberNo;
            res.json( { success : 1 , message : 'ok' ,result : datas  } );
            return;
        }

        //console.log('세션 정보 = > ', req.session);


    });


});

module.exports = router;
