var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');

var utils = require('util');

router.post('/', function(req, res){

    var memberEmail = req.body.memberEmail;
    var memberPw = req.body.memberPw;
    var registrationId = req.body.registrationId;

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

    async.waterfall([
        function (callback) {
            afeelQuery.afeelQuery(datas, queryidname , 'member', function (err, datas) {
                if(err){
                    callback(err);
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


                if(datas[0].registrationId == 0 || registrationId != datas[0].registrationId){
                    callback(null, 0)
                }else{
                    callback(null, 1)
                }

                req.session.memberNo  = datas[0].memberNo;
                //console.log('세션 정보 = > ', req.session);


            });
        },

        function (checkCode, callback) {

            if(checkCode == 0){
                afeelQuery.afeelQuery([registrationId, req.session.memberNo], 'updateRegistrationId' , 'member', function (err, datas) {
                    if(err){
                        callback(null, 0);
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

                    callback(null, 1);

                });
            }else{
                callback(null, 1);
            }

        }
    ], function (err, result) {
        if(err){
            res.json( { success : 0, message : '실패' ,result : null  } );
        }

        if(result == 1){
            res.json( { success : 1 , message : 'ok' ,result : datas  } );
        }else if(result == 0){
            res.json( { success : 0, message : '실패' ,result : null  } );
        }
    });



});


router.get('/:memberToken', function(req, res){
    console.log('토큰값이 넘어오고있습니다.');
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
    afeelQuery.afeelQuery(datas, queryidname ,'member', function (err, datas) {
        if(err){
            //res.json(err);
            console.log('페이스북 토큰이 노존재');
            res.json({success:0, message:'토큰이 존재하지 않습니다.', result:null});
            return;
        }
        console.log('페이스북 쿼리 결과,', datas);


        console.log('페이스북 토큰이 존재');
        req.session.memberNo  = datas[0].memberNo;
        res.json( { success : 1 , message : 'ok' ,result : datas  } );
        return;


        //console.log('세션 정보 = > ', req.session);


    });


});

module.exports = router;
