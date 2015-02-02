var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

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
console.log(1111111111111);
        var datas = [];
        console.log(22222222222);
        datas.push(questionNo);
        console.log(33333333333);
        global.queryName = 'myquestion';
        console.log(444444444444444);
        var queryidname = 'myquestionDelete';
        console.log(55555555555555);
        afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {

            console.log('여긴 왓냐', datas);

            if(err){
                res.json(err);
            }
            if(datas.affectedRows == 1)
                res.json(util.successCode(res, 'success'));
            else
                res.json({success:0, result:{message:'삭제에 실패하였습니다.(DB에러)'}});
        });
    }


});

module.exports = router;