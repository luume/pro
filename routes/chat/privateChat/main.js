var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');

router.get('/:privateRoomNo', function(req, res){

    var privateRoomNo = req.params.privateRoomNo;
    if(privateRoomNo == "" || privateRoomNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[privateRoomNo])", result:null});
        return;
    }

    var m = util.createValueObject('Member');
    var pr = util.createValueObject('Private_Room');
    var pm = util.createValueObject('Private_Message');

    util.successCode(res, {

        privateRoomNo : pr.Private_Room().privateRoomNo,
        messageTo : pm.Private_Message().messageTo,
        messageFrom : pm.Private_Message().messageFrom,
        messageData : pm.Private_Message().messageData,
        messageDate : pm.Private_Message().messageDate
    });
});

module.exports = router;