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


});

module.exports = router;