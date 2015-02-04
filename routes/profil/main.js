var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

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
        console.log('데이터는 ' , datas);
        console.log('데이터는 ' , datas.length);
        console.log('데이터는 ' , datas == undefined ? 1:2);
        if(datas.length == 0){
            req.session.destroy(function(err){
                if(err) console.error('err', err);
                //res.json(util.successCode(res, 'success'));
            });
            console.log('프로필 메인 에러코드 발생');
            res.json({ success : 0 , message : '에러 발생', result : null});
            return;
        }
        console.log(
          util.successCode(res, datas)
        );

        
        //res.json(util.successCode(res, datas));

        res.json({success:1, message:'ok', result: temp });
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

