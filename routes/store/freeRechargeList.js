var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.get('/', function(req, res){
    var memberNo = req.session.memberNo;
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'mystore';
    var queryidname = 'myFreeRechargeList';

    afeelQuery.afeelQuery([req.session.memberNo], queryidname , function (err, datas) {
        if(err){
            res.json(err);
            return;
        }
        if(datas == false){
            res.json({ success : 0 , message : '데이터 없음', result : null});
            return;
        }
        res.json(util.successCode(res, datas));

    });

    var m = util.createValueObject('Member');

    //res.json(util.successCode(res, {
    //    memberEmailYn : m.Member().memberEmailYn,
    //    memberSNSYn : m.Member().memberSNSYn
    //}));
});

module.exports = router;