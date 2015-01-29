var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');

router.post('/', function(req, res){

    var chatroomNo = req.body.chatroomNo;
    if(chatroomNo == "" || chatroomNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
        return;
    }

    var cr = util.createValueObject('ChatRoom');
    var m = util.createValueObject('Member');
    var c = util.createValueObject('Cash');

    res.json(util.successCode(res, {
        chatroomNo : cr.ChatRoom().chatroomNo,
        cashAmount : c.Cash().cashAmount
    }));

});

module.exports = router;