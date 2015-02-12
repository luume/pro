var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');

router.post('/', function(req, res){

    var privateRoomNo = req.body.privateRoomNo;
    //if(privateRoomNo == "" || privateRoomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[privateRoomNo])", result:null});
    //    return;
    //}
    var messageData = req.body.messageData;
    //if(messageData == "" || messageData == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[messageData])", result:null});
    //    return;
    //}
    var d = new Date();
    var tempDate = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString();

    res.json(util.successCode(res, tempDate));

});

module.exports = router;


