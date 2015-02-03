var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.get('/:chatroomNo', function(req, res){
    var chatroomNo = req.params.chatroomNo;
    if(chatroomNo == "" || chatroomNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
        return;
    }
    var memberNo = req.session.memberNo;
    if(memberNo == "" || chatroomNo == memberNo){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[memberNo])", result:null});
        return;
    }
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'member';
    var queryidname = 'fTypeMember';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        //res.json(util.successCode(res, datas));
        //console.log('datas',datas[0]);
        var feelingCode1 = datas[0].feelingCode1;
        var feelingCode2 = datas[0].feelingCode2;
        var feelingCode3 = datas[0].feelingCode3;
        if(feelingCode1 == "" || feelingCode1 == undefined || feelingCode2 == "" || feelingCode2 == undefined || feelingCode3 == "" || feelingCode3 == undefined){
            res.json({success:0, message:"Error(빈값이 넘어왔습니다.[feelingCode1,2,3])", result:null});
            return;
        }
        var datas = [];
        datas.push(feelingCode1);
        datas.push(feelingCode2);
        datas.push(feelingCode3);
        datas.push(memberNo);

        global.queryName = 'chat';
        var queryidname = 'chatForthList';

        afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
            if(err){
                res.json(err);
            }
            var fType = datas[0].fType;

            var fTypeArray = fType.split(',');

            datas[0].fType = fTypeArray;

            console.log('데이터0', datas[0]);
            res.json(util.successCode(res, datas));
        });
        //datas[0].rank = data[0].rank;

        //res.json(datas[0]);
    });





    var m = util.createValueObject('Member');
    var ft = util.createValueObject('Feeling_Type');

    //res.json(util.successCode(res, {
    //
    //    memberGender : m.Member().memberGender,
    //    memberNick : m.Member().memberNick,
    //    memberJob : m.Member().memberJob,
    //    memberHobby : m.Member().memberHobby,
    //    memberAdd : m.Member().memberAdd,
    //    memberBirth : m.Member().memberBirth,
    //    memberHeight : m.Member().memberHeight,
    //    memberEmailYn : m.Member().memberEmailYn,
    //    memberSNSYn : m.Member().memberSNSYn,
    //    fType : ft.Feeling_Type().fType
    //}));
});

module.exports = router;