var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.get('/', function(req, res){

    var isSuccess = util.sessionCheck(req);

    if(!isSuccess){
        res.send('<script>alert("session undefinded");</script>');
        return;
    }

    var memberEmail = req.body.memberEmail;

    var datas = [];
    datas.push(req.session.memberNo);
    datas.push(req.session.memberNo);

    global.queryName = 'expeople';
    var queryidname = 'endMatchList';
    console.log('datas',datas);
    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        //res.json(datas);

        afeelQuery.afeelQuery([req.session.memberNo], 'myRank' , function (err, data) {
            if(err){
                res.json(err);
            }

            datas[0].rank = data[0].rank;
            res.json(datas[0]);

        });
    });


});

module.exports = router;
