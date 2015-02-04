var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');

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
    datas.push(req.session.memberNo);
    datas.push(req.session.memberNo);

    global.queryName = 'expeople';
    var queryidname = 'endMatchList';
    console.log('datas',datas);

    async.waterfall([

        function (callback) {
            afeelQuery.afeelQuery(datas, queryidname , function (err, data1) {
                if(err){
                    res.json(err);
                    return;
                }
                callback(null, data1);
            }); // 쿼리종료
        }, // 1번함수

        function (data2, callback) {
            afeelQuery.afeelQuery([], queryidname , function (err, data2) {
                //callback(null, data2);
                callback(null,data2);
            }); // 쿼리종료
        } // 2번 함수

    ],
      function(err, result){
          // res.json 으로 마지막에 값을 싸줄 곳
      });
    );

/*    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        //res.json(datas);

        afeelQuery.afeelQuery([req.session.memberNo], 'myRank' , function (err, data) {
            if(err){
                res.json(err);
            }

            datas[0].rank = data[0].rank;
            var fType = datas[0].fType;

            var fTypeArray = fType.split(',');

            datas[0].fType = fTypeArray;

            console.log('데이터0', datas[0]);
            res.json(datas[0]);

        });
    });*/


});

module.exports = router;
