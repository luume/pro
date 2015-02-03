var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');
console.log('12312321');
router.get('/', function(req, res){

    //var chatroomNo = req.body.chatroomNo;
    var chatroomNo = 123;
    if(chatroomNo == "" || chatroomNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
        return;
    }
    var memberNo = req.session.memberNo;
    if(memberNo == "" || memberNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
        return;
    }



    var datas = [];
    datas.push(memberNo);

    global.queryName = 'mystore';
    var queryidname = 'myMainList';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        res.json(util.successCode(res, datas));
    });

    var cr = util.createValueObject('ChatRoom');
    var m = util.createValueObject('Member');
    var c = util.createValueObject('Cash');

    //res.json(util.successCode(res, {
    //    chatroomNo : cr.ChatRoom().chatroomNo,
    //    cashAmount : c.Cash().cashAmount
    //}));

});

module.exports = router;