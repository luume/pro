var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');

//router.get('/', function(req, res){
//    var memberNo = req.session.memberNo;
//    var datas = [];
//    datas.push(memberNo);
//
//    global.queryName = 'member';
//    var queryidname = 'editPasswordList';
//
//    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
//        if(err){
//            res.json(err);
//
//            return;
//        }
//        if(datas == false){
//            res.json({ success : 0 , message : '데이터 없음', result : null});
//
//            return;
//        }
//
//        res.json(util.successCode(res, datas));
//    });
//
//
//    var m = util.createValueObject('Member');
//
//    //res.json(util.successCode(res, {
//    //    memberNo : m.Member().memberNo,
//    //    memberPw : m.Member().memberPw
//    //}));
//});

router.post('/', function(req, res){

    var memberNo = req.session.memberNo;
    var memberNewPw  = req.body.memberNewPw;
    var datas = [];
    datas.push(memberNo);

    async.waterfall([
            function(callback) {
                global.queryName = 'member';
                var queryidname = 'editPasswordList';
                //현재 비밀번호 유효성 체크
                afeelQuery.afeelQuery(datas, queryidname , 'member' ,function (err, datas) {
                    console.log('비번데이터',datas);
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){ //select 결과 row 0일때 처리
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    //  console.log('첫번째 처리 성공' , datas[0].memberGender);
                    callback(null, datas[0].memberPw);
                })
            },
            function(memberPw, callback) {

                var datas = [];
                datas.push(memberNewPw);
                datas.push(memberNo);

                global.queryName = 'member';
                var queryidname = 'editPasswordMember';
                //비밀번호 Update
                global.pool.getConnection(function (err, conn) {
                    conn.beginTransaction(function (err) {
                        afeelQuery.afeelQuery(datas, queryidname , 'member', function (err, row) {
                            if(err){
                                res.json(err);
                                return;
                            }
                            if(row.affectedRows == 1){
                                callback(null, row.affectedRows);
                            } else {
                                res.json({ success : 0 , message : 'fail', result : null});
                                return;
                            }
                        });
                    }); // 트랜잭션 종료
                });
            }
        ],	function(err, results) {
            //console.log('최종 처리');
            console.log('results' , results); // result <- done
            res.json(util.successCode(res, results));
        }
    );
    //res.json(util.successCode(res, 'success'));

});

module.exports = router;