var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.get('/', function(req, res){
    var memberNo = req.session.memberNo;
    //if(memberNo == "" || chatroomNo == memberNo){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
    //    return;
    //}
    console.log('memberNo',memberNo);
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'board';
    var queryidname = 'noticeList';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }

        res.json(util.successCode(res, datas));
    });

    var not = util.createValueObject('Notice');

    //res.json(util.successCode(res, {
    //    noticeNo : not.Notice().noticeNo,
    //    noticeTitle : not.Notice().noticeTitle,
    //    noticeContent : not.Notice().noticeContent,
    //    noticeRegDate : not.Notice().noticeRegDate
    //}));
});

module.exports = router;