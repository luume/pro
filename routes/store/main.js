var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.get('/', function(req, res){
    console.log('스토어 메인 에러!!!!!!!!!!!')
    //console.log('session',req.session.memberNo);
    var memberNo = req.session.memberNo;
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'mystore';
    var queryidname = 'myMainList';

    afeelQuery.afeelQuery([req.session.memberNo], queryidname , 'mystore', function (err, datas) {
        if(err){
            console.log('스토어 메인 에러', err);
            res.json(err);
            return;
        }
        if(datas == false){
            res.json({ success : 0 , message : '데이터 없음', result : null});
            return;
        }
        //console.log('storedata',datas);
        //console.log('garadata', {memberCash : m.Member().memberCash});

        res.json(util.successCode(res, datas));
        //res.json(util.successCode(res, {
        //  memberCash : m.Member().memberCash
        //}));
    });

    var m = util.createValueObject('Member');

    //res.json(util.successCode(res, {
    //    memberCash : m.Member().memberCash
    //}));
});

module.exports = router;