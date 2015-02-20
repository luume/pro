var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');
var gcmSetting = require('../../../afeel/util/gcmSetting');
var async = require('async');

router.post('/', function(req, res){
    /*Room         privateRoomNo : 1:1 채팅방 고유 번호
    Private_Message    messageData :*/

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
    var messageTO = req.body.messageTo;

    var memberName = req.body.memberName;
    console.log('1111111111reqbody',req.body);
    //console.log('messageTO',messageTO);




    async.waterfall([
        // messageNo, privateRoomNo, messageFrom, messageTO, messageData
        function (callback) {
            //INSERT INTO PRIVATE_MESSAGE(messageNo, privateRoomNo, messageFrom, messageTO, messageData) VALUES(0, ?, ?, ?, ?)
            afeelQuery.afeelQuery([privateRoomNo, req.session.memberNo,  messageTO, messageData], 'insertPrivateMessage', 'chat', function (err, datas) {

                if(err){
                    console.log('채팅 메세지 삽입 실패', err);
                    callback(0);
                    return;
                }

                callback(null, 1);

            })

        },

        function (successCode, callback) {
            if(successCode == 1) {
                afeelQuery.afeelQuery([req.session.memberNo], 'selectGcmThumbnail', 'profil', function (err, datas) {

                    if (err) {
                        console.log('채팅 메세지 삽입 실패', err);
                        callback(0);
                        return;
                    }

                    callback(null, datas[0].profilThumbnail);

                })
            }
        }

    ], function (err, profilThumbnail) {

        var d = new Date();
        var tempDate = pad2(d.getFullYear().toString()) +'-'+ pad2((d.getMonth() + 1).toString()) +'-'+ pad2(d.getDate().toString()
          +' '+ pad2(d.getHours().toString()) +':'+ pad2(d.getMinutes().toString()) +':'+ pad2(d.getSeconds().toString()));
        console.log('날짜형식', tempDate);
        console.log('사진파일', profilThumbnail);
        gcmSetting.gcmSend([messageTO], {gcmType : 'PM' ,messageData : messageData, privateChatRegDate : tempDate,
            privateRoomNo : privateRoomNo, memberName : memberName, profilThumbnail:profilThumbnail, messageTo:req.session.memberNo});

        //console.log('응?');
        res.json(util.successCode(res, tempDate));
        //res.json({success:1, message:'ok', result:tempDate});
    })




    //res.json(util.successCode(res, tempDate));

});


function pad2(n) {  // always returns a string
    return (n < 10 ? '0' : '') + n;
}

module.exports = router;


