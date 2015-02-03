var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.get('/', function(req, res){
    var memberNo = req.session.memberNo;
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'board';
    var queryidname = 'requestList';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        res.json(util.successCode(res, datas));
    });

    var re = util.createValueObject('Request');

    //res.json(util.successCode(res, {
    //    requestNo : re.Request().requestNo,
    //    requestTitle : re.Request().requestTitle,
    //    requestContent : re.Request().requestContent,
    //    requestRegDate : re.Request().requestRegDate
    //}));
});

module.exports = router;