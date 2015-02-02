var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.post('/', function(req, res){

    util.variableCheck(req.body);

    var questionNo = req.body.questionNo;
    var questionData = req.body.questionData;
    var questionGuideData = req.body.questionGuideData;

    var datas = [];

    datas.push(questionData);
    datas.push(questionGuideData);
    datas.push(questionNo);

    global.queryName = 'myquestion';
    var queryidname = 'myquestionUpdate';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        res.json(util.successCode(res, datas));
    });

});

module.exports = router;