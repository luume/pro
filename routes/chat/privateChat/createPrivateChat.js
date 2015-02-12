var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

router.post('/', function(req, res){

    //var chatroomNo = req.body.chatroomNo;
    //if(chatroomNo == "" || chatroomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
    //    return;
    //}



    var datas = [];
    datas.push(memberWNo);
    datas.push(memberMNo);
    afeelQuery.afeelQuery(datas, queryidname , 'member', function (err, datas) { //오메기떡 차감
        if(err){
            res.json(err);
            return;
        }
        if(datas == false){ //select 결과 row 0일때 처리
            res.json({ success : 0 , message : '데이터 없음', result : null});
            return;
        }
        //  console.log('첫번째 처리 성공' , datas[0].memberGender);
        callback(null, '1');
    })

    var m = util.createValueObject('Member');
    var pr = util.createValueObject('Private_Room');

    res.json(util.successCode(res, {
        privateRoomNo : pr.Private_Room().privateRoomNo,
        messageTo : pm.Private_Message().messageTo,
        isafeel : '/chat/createprivatechat/:privateRoomNo'
    }));

});

module.exports = router;