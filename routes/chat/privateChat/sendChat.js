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

    console.log('reqbody',req.body);
    console.log('messageData',messageData);


    function pad2(n) {  // always returns a string
        return (n < 10 ? '0' : '') + n;
    }
    var d = new Date();
    var tempDate = pad2(d.getFullYear().toString()) + pad2((d.getMonth() + 1).toString()) + pad2(d.getDate().toString()
        + pad2(d.getHours().toString()) + pad2(d.getMinutes().toString()));

    res.json(util.successCode(res, tempDate));

});

module.exports = router;


