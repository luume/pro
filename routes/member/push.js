var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

var async = require('async');

router.post('/', function(req, res){

    var memberNo = req.session.memberNo;

    var datas = [];
    datas.push(memberNo);
    //datas.push(questionData);
    //datas.push(questionGuide);

    async.waterfall([
            function(callback) {
                global.queryName = 'member';
                var queryidname = 'pushCheckMember';
                afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){ //select 결과 row 0일때 처리
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    //  console.log('첫번째 처리 성공' , datas[0].memberGender);
                    callback(null, datas[0].memberPushYn);
                })
            },
            function(memberPushYn, callback) {
                if (memberPushYn == 0) { //푸쉬알림 켜져있음
                    global.queryName = 'member';
                    var queryidname = 'pushOffMember';
                    //pushOff 으로 Update
                    global.pool.getConnection(function (err, conn) {
                        conn.beginTransaction(function (err) {
                            afeelQuery.afeelQuery(datas, queryidname , function (err, row) {
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

                } else { //푸쉬알림 꺼져있음
                    global.queryName = 'member';
                    var queryidname = 'pushOnMember';
                    //pushOn 으로 Update
                    global.pool.getConnection(function (err, conn) {
                        conn.beginTransaction(function (err) {
                            afeelQuery.afeelQuery(datas, queryidname , function (err, row) {
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
            }
        ],	function(err, results) {
            //console.log('최종 처리');
            console.log('results' , results); // result <- done

            res.json(util.successCode(res, results));
        }
    );

    var m = util.createValueObject('Member');

    res.json(util.successCode(res, {
        memberPushYn : m.Member().memberPushYn
    }));

});

module.exports = router;