var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

var async = require('async');

router.get('/:privateRoomNo', function(req, res){
    var privateRoomNo = req.params.privateRoomNo;
    //if(privateRoomNo == "" || privateRoomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[privateRoomNo])", result:null});
    //    return;
    //}
    var memberTo = req.body.memberTo;
    var memberNo = req.session.memberNo;
    //if(memberNo == "" || memberNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
    //    return;
    //}



    var queryidname = 'viewPrivateChat';
console.log('모야');
    console.log(req.body);

    async.waterfall([

        function (callback) {
            console.log('여기00000000');
            afeelQuery.afeelQuery([req.session.memberNo], 'genderMember' ,'member', function (err, datas) {
                if(err) console.error(err);
                console.log('여기111111');
                callback(null, datas[0].memberGender );
            });

        },

        function (gender, callback) {
            if(gender == 'W'){
                console.log('여기22222222');
                afeelQuery.afeelQuery([privateRoomNo, req.session.memberNo], 'otherW' ,'chat', function (err, datas) {
                    callback(null, datas[0].memberMNo );
                });
            }else if(gender == 'M'){
                afeelQuery.afeelQuery([privateRoomNo, req.session.memberNo], 'otherM' ,'chat', function (err, datas) {
                    callback(null, datas[0].memberWNo );
                });
            }

        },

        function (otherNo, callback) {
            var datas = [];
            datas.push(otherNo);
            datas.push(memberNo);
            datas.push(memberNo);
            datas.push(privateRoomNo);
            afeelQuery.afeelQuery(datas, queryidname ,'chat', function (err, datas) {
                console.log('여기333333333');
               /* if(datas == false || datas == undefined){
                    console.log('여기들어온다아..');
                    //var d = new Date();
                    var tempDate = pad2(d.getFullYear().toString()) +'-'+ pad2((d.getMonth() + 1).toString()) +'-'+ pad2(d.getDate().toString()
                      +' '+ pad2(d.getHours().toString()) +':'+ pad2(d.getMinutes().toString()) +':'+ pad2(d.getSeconds().toString()));
                    res.json({success : '1' , message : 'OK', result : [{ isMe : 1 , messageFrom :  memberNo , messageTo : otherNo ,  messageData : '' , messageDate : tempDate , memberName : ''}] });
                    return;
                }*/

                res.json(util.successCode(res, datas));
            });
        }

    ]);





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

function pad2(n) {  // always returns a string
    return (n < 10 ? '0' : '') + n;
}

module.exports = router;