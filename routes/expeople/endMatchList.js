var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.get('/', function(req, res){
    //console.log('sdfsdfsdfsdfsdf');
  /*  var m = util.createValueObject('Member');
    var cr = util.createValueObject('ChatRoom');
    var f = util.createValueObject('Feeling');
    var ft = util.createValueObject('Feeling_Type');
    var p = util.createValueObject('Profil');
*/

    var isSuccess = util.sessionCheck(req);

    if(!isSuccess){
        res.send('<script>alert("session undefinded");</script>');
        return;
    }

    var memberEmail = req.body.memberEmail;

    var datas = [];
    datas.push(req.session.memberNo);
    datas.push(req.session.memberNo);

    //datas.push(profilOriginalFileName);

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

            var result = {};
            console.log('2번쨰 쿼리 ' ,data);
            result = datas;
            result['rank'] = data[0]['rank'];

            console.log('result : ' , result);
            res.json(result);

        });
    });


});

module.exports = router;
