var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.get('/:privateRoomNo', function(req, res){
    var privateRoomNo = req.params.privateRoomNo;
    //if(privateRoomNo == "" || privateRoomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[privateRoomNo])", result:null});
    //    return;
    //}
    var memberNo = req.session.memberNo;
    //if(memberNo == "" || memberNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
    //    return;
    //}

    var datas = [];
    datas.push(privateRoomNo);

    global.queryName = 'chat';
    var queryidname = 'viewPrivateChat';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);

        }
        res.json(util.successCode(res, datas));
    });



    //global.queryName = 'chat';
    //var queryidname = 'privateChatList';
    //
    //
    //afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
    //    if(err){
    //        res.json(err);
    //    }
    //    res.json(util.successCode(res, datas));
    //});



    var m = util.createValueObject('Member');
    var pr = util.createValueObject('Private_Room');
    var pm = util.createValueObject('Private_Message');

    //res.json(util.successCode(res, {
    //
    //    privateRoomNo : pr.Private_Room().privateRoomNo,
    //    messageTo : pm.Private_Message().messageTo,
    //    messageFrom : pm.Private_Message().messageFrom,
    //    messageData : pm.Private_Message().messageData,
    //    messageDate : pm.Private_Message().messageDate
    //}));
});

module.exports = router;