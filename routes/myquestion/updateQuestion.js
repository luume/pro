var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.post('/', function(req, res){
    var errobj = {};
     errobj = util.variableCheck(req.body, 3);
    console.log('체크요', errobj);


    if(errobj != undefined ){
        console.log('if문 진입');
        res.json(errobj);
        //return;
    }else{
        console.log('else문 진입', errobj);

        var questionNo = req.body.questionNo;
        var questionData = req.body.questionData;
        var questionGuideData = req.body.questionGuideData;

        var datas = [];

        datas.push(questionData);
        datas.push(questionGuideData);
        datas.push(questionNo);

        if(questionNo == undefined || questionNo == '' ){

            res.json({success:0, message:'질문번호가 없습니다', result:null});
            return;
        }

        global.queryName = 'myquestion';
        var queryidname = 'myquestionUpdate';

        afeelQuery.afeelQuery(datas, queryidname , 'myquestion', function (err, datas) {
            console.log('333333333333333333333', datas);
            if(err){
                res.json(err);
            }
            if(datas.affectedRows == 1) {

                res.json(util.successCode(res, 'success'));
            }else {

                res.json({success: 0, result: {message: '질문 수정에 실패하였습니다.(DB에러)'}});
            }
        });
    }
});

module.exports = router;