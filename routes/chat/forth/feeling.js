var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.post('/', function(req, res){
    var chatroomNo = req.body.chatroomNo;
    var memberNo = req.session.memberNo; //현재 회원번호 밑에서 memberTo에 들어감
    var memberTo = req.body.memberTo; //평가할 회원번호 memberNo에 들어감
    var feelingCode = req.body.feelingCode;
    var feelingRate = req.body.feelingRate;



    var datas = [];
    datas.push(memberNo);
    datas.push(feelingCode);
    datas.push(memberTo);
    datas.push(feelingRate);

    var queryidname = 'insertFeeling';
    afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
        if (err) {
            res.json(err);
            return;
        }
        if (datas.affectedRows == 1) {
            res.json(util.successCode(res, 'success'));
        }else {
            res.json({success: 0, result: {message: 'feeling평가에 실패'}});
            return;
        }
    });

    //
    //res.json(util.successCode(res, 'success'));

});

module.exports = router;