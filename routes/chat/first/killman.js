var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

// 소개 받기//////////
router.post('/', function(req, res) {

    var memberNo = req.body.memberNo; //죽일 남성 번호
    var chatroomNo = req.body.chatroomNo; //해당 채팅방 번호
    var rank = 4;

    var datas = [];
    datas.push(memberNo);
    datas.push(chatroomNo);
    datas.push(rank);

    var queryidname = 'killman';
    afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
        if (err) {
            res.json(err);
            return;
        }
        if (datas.affectedRows == 1) {
            res.json(util.successCode(res, 'success'));
        }else {
            res.json({success: 0, result: {message: '4등 탈락자 선정에 실패'}});
            return;
        }
    });

    //CHAT_RANK에 선택된놈 4등 insert

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
