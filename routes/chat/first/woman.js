var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

// 소개 받기//////////
router.get('/', function(req, res) {

    var memberNo = req.session.memberNo;
    var chatroomNo = req.body.chatroomNo;

    var datas = [];
    datas.push(memberNo);
    datas.push(chatroomNo);
    datas.push(memberNo);
    datas.push(chatroomNo);
    datas.push(memberNo);
    datas.push(chatroomNo);
    datas.push(memberNo);
    datas.push(chatroomNo);

    var queryidname = 'chatFirstWoman';
    afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
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

    var m = util.createValueObject('Member');
    var f = util.createValueObject('Feeling');
    var p = util.createValueObject('Profil');

    //res.json(util.successCode(res,
    //    {
    //        memberName : m.Member().memberName,
    //        memberBirth : m.Member().memberBirth,
    //        memberGender  : m.Member().memberGender ,
    //        memberHobby  : m.Member().memberHobby ,
    //        memberAdd  : m.Member().memberAdd ,
    //        memberHeight  : m.Member().memberHeight ,
    //        memberJob  : m.Member().memberJob ,
    //        memberSnsYn  : m.Member().memberSnsYn ,
    //        memberHPYn  : m.Member().memberHPYn ,
    //        memberEmailYn  : m.Member().memberEmailYn ,
    //        memberStMeeting  : m.Member().memberStMeeting ,
    //        feelingCode1  : m.Member().feelingCode1 ,
    //        feelingCode2  : m.Member().feelingCode2 ,
    //        feelingCode3  : m.Member().feelingCode3 ,
    //        profilSaveFileName   : p.Member().profilSaveFileName
    //    }
    //));

});

module.exports = router;
