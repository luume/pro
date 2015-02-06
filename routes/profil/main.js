var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');
router.get('/', function(req, res){
    var memberNo = req.session.memberNo;
    var datas = [];
    datas.push(memberNo);

    global.queryName = 'profil';
    var queryidname = 'profilList';

    afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
        if(err){
            res.json(err);
        }
        if(datas == false){
            req.session.destroy(function(err){
                if(err) console.error('err', err);
            });
            res.json({ success : 0 , message : '에러 발생', result : null});
            return;
        }

        var profilThumbnail = [];
        var temp;
        afeelQuery.afeelQuery([req.session.memberNo], 'profilFileSelect', function (err, profilName) {
            if(err){res.json(err);}


            var arr = [];
            var a = 0;
            async.each(profilName, function (row, callback) {
                arr.push(row.profilThumbnail);

                callback();

            }, function(err){
                //console.log('모두 성공');
                //console.log('arr', arr);
                profilThumbnail = arr;
                temp = datas;
                datas[0].profilThumbnail = arr;
                temp.aaa = arr;

                res.json({success:1, message:'ok', result:datas[0]});
            });

        });








        //res.json({success:1, message:'ok', result: temp });
    });

    var m = util.createValueObject('Member');
    var pro = util.createValueObject('Profil');

    //res.json( util.successCode(res, {
    //    memberName : m.Member().memberName,
    //    memberBirth : m.Member().memberBirth,
    //    memberHobby : m.Member().memberHobby,
    //    memberAdd : m.Member().memberAdd,
    //    memberJob : m.Member().memberJob,
    //    memberHeight : m.Member().memberHeight,
    //    profilOriginalFileName  : ['https://54.92.4.84/images/Hydrangeas-thumbnail.jpg',
    //        'https://54.92.4.84/images/Jellyfish-thumbnail.jpg',
    //        'https://54.92.4.84/images/Koala-thumbnail.jpg',
    //        'https://54.92.4.84/images/Penguins-thumbnail.jpg',
    //        'https://54.92.4.84/images/Lighthouse-thumbnail.jpg']
    //}));
});

module.exports = router;

