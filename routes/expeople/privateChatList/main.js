var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.get('/', function(req, res){

    var memberNo = req.session.memberNo;
    //if(memberNo == "" || memberNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
    //    return;
    //}
    //var datas = [];
    //datas.push(memberNo);
    //
    //global.queryName = 'member';
    //var queryidname = 'genderMember';
    //
    //afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
    //    if(err){
    //        res.json(err);
    //    }
    //    //res.json(util.successCode(res, datas));
    //
    //
    //});

    var datas = [];
    //datas.push(memberNo);

    global.queryName = 'member';
    var queryidname = 'myPrivateChatList';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        console.log('data',datas);
        res.json(util.successCode(res, datas));
    });

    var m = util.createValueObject('Member');
    var pm = util.createValueObject('Private_Message');
    var p = util.createValueObject('Profil');

    res.json({
            success : 1,
            message : 'OK',
            result : [{
                memberName :  m.Member().memberName,
                messageData : pm.Private_Message().messageData,
                messageDate : pm.Private_Message().messageDate,
                profilSaveFileName : 'https://54.92.4.84/images/Hydrangeas-thumbnail.jpg'
            },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Jellyfish-thumbnail.jpg'
                },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Koala-thumbnail.jpg'
                },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Penguins-thumbnail.jpg'
                },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Lighthouse-thumbnail.jpg'
                },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Tulips-thumbnail.jpg'
                }

            ]

        }

    );
    //

    //
});

module.exports = router;