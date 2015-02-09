var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');
router.get('/:memberTo', function(req, res){
    var memberNo = req.session.memberNo; //현재 사용자
    var memberTo = req.params.memberTo; //프로필을 볼 사용자
    var datas = [];
    datas.push(memberNo);
    datas.push(memberTo);

    async.waterfall([
            function(callback) {
                global.queryName = 'member';
                var queryidname = 'feelingMember';
                //feeling code 및 feeling rate 가져옴
                afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
                    if(err){
                        res.json(err);
                        return;
                    }
                    if(datas == false){ //select 결과 row 0일때 처리
                        res.json({ success : 0 , message : '데이터 없음', result : null});
                        return;
                    }
                    //console.log('첫번째 처리 성공' , datas[0]);
                    callback(null, datas[0]);
                })

            },
            function(memberdata, callback) {
                //console.log('memberdata.feelingCode1' , memberdata.feelingCode1);
                var datas = [];
                datas.push(memberdata.feelingCode1);
                datas.push(memberdata.feelingCode2);
                datas.push(memberdata.feelingCode3);
                datas.push(memberTo);

                global.queryName = 'profil';
                var queryidname = 'profilYour';

                afeelQuery.afeelQuery(datas, queryidname , function (err, datas) {
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
                    afeelQuery.afeelQuery([memberTo], 'profilFileSelect', function (err, profilName) {
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
                            datas[0].memberRate = memberdata.memberRate;
                            temp.aaa = arr;

                            res.json({success:1, message:'ok', result:datas[0]});
                        });

                    });
                });

            }
        ],	function(err, results) {
            //console.log('최종 처리');
            console.log('results' , results); // result <- done
            res.json(util.successCode(res, results));
        }
    );


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

