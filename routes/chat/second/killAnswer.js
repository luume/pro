var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.post('/', function(req, res){
    var chatroomNo = req.body.chatroomNo;
    var memberNo = req.body.memberNo;
    var rank = 3;

    var datas = [];
    datas.push(memberNo);
    datas.push(chatroomNo);
    datas.push(rank);

    var queryidname = 'killMan';
    afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
        if (err) {
            res.json(err);
            return;
        }
        if (datas.affectedRows == 1) {
            res.json(util.successCode(res, 'success'));
        }else {
            res.json({success: 0, result: {message: '3등 탈락자 선정에 실패'}});
            return;
        }
    });

    //
    //res.json(util.successCode(res, 'success'));

});

module.exports = router;