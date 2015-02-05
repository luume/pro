var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.get('/', function(req, res){
    //console.log('session',req.session.memberNo);
    var memberNo = req.session.memberNo;
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'mystore';
    var queryidname = 'myMainList';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        console.log('storedata',datas);
        //res.json(util.successCode(res, datas));
        res.json(util.successCode(res, {
          memberCash : m.Member().memberCash
        }));
    });

    var m = util.createValueObject('Member');

    //res.json(util.successCode(res, {
    //    memberCash : m.Member().memberCash
    //}));
});

module.exports = router;