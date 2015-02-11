var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');

router.post('/:privateRoomNo', function(req, res){
    var privateRoomNo = req.params.privateRoomNo;
    //if(privateRoomNo == "" || privateRoomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[privateRoomNo])", result:null});
    //    return;
    //}
    var datas = [];
    datas.push(privateRoomNo);
    global.queryName = 'expeople';
    var queryidname = 'privateRoomDelete';
    afeelQuery.afeelQuery(datas, queryidname , 'myquestion', function (err, datas) {

        if (err) {
            res.json(err);
        }
        if (datas.affectedRows == 1) {
            res.json(util.successCode(res, 'success'));
        }else {
            res.json({success: 0, result: {message: '삭제에 실패하였습니다.(잘못된 질문번호 입력)'}});

        }
    });

    //res.json(util.successCode(res, 'success'));

});

module.exports = router;