var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');
var gcmSetting = require('../../../afeel/util/gcmSetting');

var async =require('async');

Array.prototype.removeElement = function(index)
{
    this.splice(index,1);
    return this;
};

router.post('/', function(req, res){
    var chatroomNo = req.body.chatroomNo;
    var memberNo = req.body.memberNo; //버릴 회원 번호
    var winMemberNo = req.body.winMemberNo; //이긴 회원 번호
    var rank = 2;

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

            rank = 1;
            var windatas = [];
            windatas.push(winMemberNo);
            windatas.push(chatroomNo);
            windatas.push(rank);

            afeelQuery.afeelQuery(windatas, queryidname , 'chat', function (err, datas) {
                if (err) {
                    res.json(err);
                    return;
                }
                if (datas.affectedRows == 1) {
                    res.json(util.successCode(res, 'success'));
                }else {
                    res.json({success: 0, result: {message: '1등 선정에 실패'}});
                    return;
                }
            });
        }else {
            res.json({success: 0, result: {message: '2등 선정에 실패'}});
            return;
        }
    });
});

module.exports = router;