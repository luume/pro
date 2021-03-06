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

    afeelQuery.afeelQuery([req.session.memberNo], queryidname , 'profil', function (err, datas) {
        if(err){
            res.json(err);
            return;
        }
        if(datas == false){
            res.json({ success : 0 , message : '데이터 없음', result : null});
            return;
        }

        var profilThumbnail = [];
        var temp;
        afeelQuery.afeelQuery([req.session.memberNo], 'profilFileSelect', 'profil', function (err, profilName) {
            if(err){res.json(err);}


            var arr = [];
            var a = 0;
            async.each(profilName, function (row, callback) {
                arr.push(row.profilThumbnail);

                callback();

            }, function(err){
                profilThumbnail = arr;
                temp = datas;
                datas[0].profilThumbnail = arr;
                temp.aaa = arr;

                res.json({success:1, message:'ok', result:datas[0]});
            });

        });
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

