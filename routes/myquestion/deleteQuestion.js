var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');
router.post('/', function(req, res){

    //var errobj = {};
    //errobj = util.variableCheck(req.body, 1);
    //if(errobj != undefined ){
    //    console.log('if',errobj);
    //    res.json(errobj);
    //    //return;
    //}else{
    //    console.log('else',errobj);
    //    var questionNo = req.body.questionNo;
    //    var datas = [];
    //    datas.push(questionNo);
    //    global.queryName = 'myquestion';
    //    var queryidname = 'myquestionDelete';
    //    afeelQuery.afeelQuery(datas, queryidname , 'myquestion', function (err, datas) {
    //
    //        if (err) {
    //            res.json(err);
    //        }
    //        if (datas.affectedRows == 1) {
    //            res.json(util.successCode(res, 'success'));
    //
    //
    //        }else {
    //            res.json({success: 0, result: {message: '삭제에 실패하였습니다.(잘못된 질문번호 입력)'}});
    //
    //        }
    //    });
    //}

    async.waterfall([
            function(callback) {
                var questionNo = req.body.questionNo;
                var datas = [];
                datas.push(questionNo);
                var queryidname = 'myquestionDeleteSet';
                afeelQuery.afeelQuery(datas, queryidname , 'myquestion', function (err, datas) {
                    if (err) {
                        res.json(err);
                    }
                    if (datas.affectedRows == 1) {
                        //res.json(util.successCode(res, 'success'));
                        callback(null, 'success');

                    }else {
                        res.json({success: 0, result: {message: '삭제에 실패하였습니다.(잘못된 질문번호 입력)'}});
                    }
                    //console.log('첫번째 처리 성공' , datas[0]);

                })
            },
            function(aa, callback) {
                //console.log('answerData', answerData);
                //   console.log('여자다');
                var questionNo = req.body.questionNo;
                var datas = [];
                datas.push(questionNo);
                var queryidname = 'myquestionDelete';
                afeelQuery.afeelQuery(datas, queryidname , 'myquestion', function (err, datas) {
                    if (err) {
                        res.json(err);
                    }
                    if (datas.affectedRows == 1) {
                        //res.json(util.successCode(res, 'success'));
                        callback(null, 'success');

                    }else {
                        res.json({success: 0, result: {message: '삭제에 실패하였습니다.(잘못된 질문번호 입력)'}});
                    }
                    //console.log('첫번째 처리 성공' , datas[0]);

                })

            }
        ],	function(err, results) {
            // console.log('최종 처리');
            // console.log('results' , results); // result <- done
            //var arr = [];
            //arr.push(datas);
            //res.json({
            //    success : 1,
            //    message : 'OK',
            //    result : {
            //        questionData: questionData.questionData,
            //        questionGuideData: questionData.questionGuideData,
            //        textAnswer : datas
            //    }
            //});
            res.json(util.successCode(res, results));
            //res.json({success:1, message:'ok', result:datas[0]});
            //res.json(util.successCode(res, results));
        }
    );


});

module.exports = router;