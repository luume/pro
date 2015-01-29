var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.post('/', function(req, res){

    var questionNo = req.body.questionNo;
    if(questionNo == "" || questionNo == undefined){
        res.json({success:0, message:"Error(빈값이 넘어왔습니다.[questionNo])", result:null});
        return;
    }

    res.json(util.successCode(res, 'success'));

});

module.exports = router;