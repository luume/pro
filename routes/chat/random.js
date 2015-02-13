var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');
// 랜덤 소개 받기
router.post('/', function(req, res) {

  var memberGender = req.body.memberGender;


  async.waterfall([

    // 이전에 매칭된 이성 검색
    function (callback) {
      if(memberGender == 'W'){
        var bindData = [];
        for(var i = 0 ; i < 14; i++){
          bindData.push(req.session.memberNo);
        }
        afeelQuery.afeelQuery(bindData, 'endMatchListW', 'expeople', function (err, datas) {
          callback(null, datas);
        });
      }else if(memberGender == 'M'){
        afeelQuery.afeelQuery([], 'endMatchListM', 'expeople', function (err, datas) {
          callback(null, datas);
        });
      }

    }, // 1번째 워터폴

    // 채팅방에 빈 공간이 있는지 검색
    function (rows, callback) {
      var bindData = [];
      for(var i = 0 ; i < 4; i++){
        bindData.push(req.session.memberNo);
      }

      var tempRows = rows;
      if(tempRows.constructor === Object){
        tempRows = new Array(tempRows);
      }

      var sum = '(';
      for(var  i = 0; i < tempRows.length; i++){
        if(i == tempRows.length - 1 ){
          sum += tempRows[i].memberNo + ')';
          break;
        }
        sum += tempRows[i].memberNo + ',';
      }

      for(var i = 0 ; i < 4; i++){
        bindData.push(sum);
      }

      if(memberGender == 'W'){
        afeelQuery.afeelQuery(bindData, 'clearSpaceCheckWomen', 'chat', function (err, datas) {
          if(datas == false){
            callback(null, 0);
          }else{
            callback(null, 1);
          }
        });
      }else if(memberGender == 'M'){
        afeelQuery.afeelQuery(bindData, 'clearSpaceCheckMan', 'chat', function (err, datas) {
          if(datas == false){
            callback(null, 0);
          }else{
            callback(null, 1);
          }

        });
      }

    }, // 2번째 워터폴


    // 채팅방에 공간이 있으면 UPDATE 아니면 INSERT
    function (successCode, callback) {

      if(successCode == 0){
        afeelQuery.afeelQuery([], 'endMatchListM', 'expeople', function (err, datas) {
          callback(null, datas);
        });
      }else if(successCode == 1){

      }

    } // 3번째 워터폴

  ]); // 워터폴 종료부분




  res.json(util.successCode(res, 'success'));

});

module.exports = router;
