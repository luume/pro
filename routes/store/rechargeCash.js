var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.post('/', function(req, res){
    //console.log('스토어 리차지!!!!!!!')

    var memberNo = req.session.memberNo;
    var omegi = req.body.omegi;

    console.log('omegi!!!!!!!!!!!!!!!!!!!!',req.body);

    var datas = [];
    datas.push(omegi);
    datas.push(memberNo);

    var queryidname = 'PlusMemberCash';
    afeelQuery.afeelQuery(datas, queryidname , 'member', function (err, datas) {
        if (err) {
            res.json(err);
            return;
        }
        if (datas.affectedRows == 1) {
            res.json(util.successCode(res, 'success'));
        }else {
            res.json({success: 0, result: {message: '캐쉬정보 업데이트에 실패하였습니다.'}});
            return;
        }
    });

    //res.json(util.successCode(res, 'success'));

});

module.exports = router;