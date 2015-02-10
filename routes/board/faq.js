var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

router.get('/', function(req, res){
    var memberNo = req.session.memberNo;
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'board';
    var queryidname = 'faqList';

    afeelQuery.afeelQuery([req.session.memberNo], queryidname , 'board', function (err, datas) {
        if(err){
            res.json(err);
            return;
        }
        if(datas == false){
            res.json({ success : 0 , message : '데이터 없음', result : null});
            return;
        }

        res.json(util.successCode(res, datas));

    });

    var faq = util.createValueObject('Faq');

    //res.json(util.successCode(res, {
    //    faqNo : faq.Faq().faqNo,
    //    faqQuestion : faq.Faq().faqQuestion,
    //    faqAnswer : faq.Faq().faqAnswer
    //}));
});

module.exports = router;