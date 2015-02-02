var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
router.post('/', function(req, res){

    var errobj = {};
    errobj = util.variableCheck(req.body, 1);
    if(errobj != undefined ){
        console.log('if',errobj);
        res.json(errobj);
        //return;
    }else{
        console.log('else',errobj);
        var questionNo = req.body.questionNo;
        var datas = [];
        datas.push(questionNo);
        global.queryName = 'myquestion';
        var queryidname = 'myquestionDelete';
        afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {

            if(err){
                res.json(err);
            }
            if(datas.affectedRows == 1)
                res.json(util.successCode(res, 'success'));
            else
                res.json({success:0, result:{message:'삭제에 실패하였습니다.(잘못된 질문번호 입력)'}});
        });
    }


});

module.exports = router;