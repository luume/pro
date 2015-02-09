var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

// 앱 홈 화면
router.get('/', function(req, res) {

  var memberNo = req.session.memberNo;
  var datas = [];
  global.queryName = 'chat';
  var queryidname = 'chatMain';
//잠시더미처리
  afeelQuery.afeelQuery([req.session.memberNo], queryidname , function (err, datas) {
    if(err){
      console.log('home 에러', err);
      res.json(err);

      return;
    }
    if(datas == false){
      res.json({ success : 0 , message : '데이터 없음', result : null});

      return;
    }
    //for(i=0; i<datas.length; i++){
    //  var arr = [];
    //  arr.push(datas[i].profilThumbnail);
    //  //console.log(datas[i]);
    //  profilThumbnail = arr;
    //  temp = datas;
    //  datas[i].profilThumbnail = arr;
    //  temp.aaa = arr;
    //
    //}
    var arr = [];
    for(i=0; i<datas.length; i++){
      arr.push(datas[i]);
      //arr.push(datas[i].profilThumbnail);

      //datas[i].profilThumbnail = arr;
      //[i].profilThumbnail = arr;
    }

    //console.log('arr',arr);


    //var homeArray = new Array();
    res.json(util.successCode(res, arr))
  });
  var m = util.createValueObject('Member');

  var p = util.createValueObject('Profil');

  //res.json({
  //  success : 1,
  //  message : 'ok',
  //  result : [{
  //    profilThumbnail: ['http://54.92.4.84:3000/images/Hydrangeas-thumbnail.jpg', 'http://54.92.4.84:3000/images/Jellyfish-thumbnail.jpg', 'http://54.92.4.84:3000/images/Penguins-thumbnail.jpg', 'http://54.92.4.84:3000/images/Tulips-thumbnail.jpg', 'http://54.92.4.84:3000/images/Lighthouse-thumbnail.jpg']
  //  }]
  //});


});

module.exports = router;
