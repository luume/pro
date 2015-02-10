var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.post('/', function(req, res){

    var memberNo = req.session.memberNo;
    var memberWithdrawReason = req.body.memberWithdrawReason;
    //if(memberWithdrawReason == "" || memberWithdrawReason == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberWithdrawReason])", result:null});
    //    return;
    //}
    var datas = [];
    datas.push(memberWithdrawReason);
    datas.push(memberNo);

    global.queryName = 'member';
    var queryidname = 'withdrawMember';
    //회원탈퇴
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