var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.get('/:chatroomNo', function(req, res){
    var memberNo = req.session.memberNo;
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'member';
    var queryidname = 'fTypeMember';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        res.json(util.successCode(res, datas));
        //datas[0].rank = data[0].rank;
        //var fType = datas[0].fType;

        //var fTypeArray = fType.split(',');

        //datas[0].fType = fTypeArray;

        //console.log('데이터0', datas[0]);
        //res.json(datas[0]);
    });

    var chatroomNo = req.params.chatroomNo;
    if(chatroomNo == "" || chatroomNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
        return;
    }



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