var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');
var gcmSetting = require('../../afeel/util/gcmSetting');

// 랜덤 소개 받기
router.post('/', function(req, res) {

  var memberGender = req.body.memberGender;

  var sum;

  console.log('소개받기 body ', req.body);

  async.waterfall([

    // 이전에 매칭된 이성 검색
    function (callback) {
      var bindData = [];
      if(memberGender == 'W'){
        for(var i = 0 ; i < 14; i++){
          bindData.push(req.session.memberNo);
        }
        afeelQuery.afeelQuery(bindData, 'endMatchListW', 'expeople', function (err, datas) {
          callback(null, datas);
        });
      }else if(memberGender == 'M'){
        for(var i = 0 ; i < 15; i++){
          bindData.push(req.session.memberNo);
        }
        afeelQuery.afeelQuery(bindData, 'endMatchListM', 'expeople', function (err, datas) {
          callback(null, datas);
        });
      }

    }, // 1번째 워터폴

    // 채팅방에 빈 공간이 있는지 검색
    function (rows, callback) {

      var tempRows = rows;
      if(tempRows.constructor === Object){
        tempRows = new Array(tempRows);
      }

      /*var sum = '(';
      for(var  i = 0; i < tempRows.length; i++){
        if(i == tempRows.length - 1 ){
          sum += tempRows[i].memberNo + ')';
          break;
        }
        sum += tempRows[i].memberNo + ',';
      }*/

      var sum = [];

      for(var i = 0 ; i < tempRows.length; i++){
        sum.push(tempRows[i].memberNo);
      }

      var test = sum.join(',');

/*
      if(sum == '('){
        sum = '()';
      }*/


      console.log('sum 최종값 : ' , sum);

      var bindData = [];
      if(memberGender == 'W'){
        /*bindData.push(sum);
        bindData.push(sum);
        bindData.push(sum);
        bindData.push(sum);*/
        bindData.push(test);
        bindData.push(test);
        bindData.push(test);
        bindData.push(test);
        bindData.push(req.session.memberNo);
        bindData.push(req.session.memberNo);
        afeelQuery.afeelQuery(bindData, 'clearSpaceCheckWomen', 'chat', function (err, datas) {
          console.log('채팅방 공간 체크' , datas);
          if( datas == undefined){
            callback(new Error('undeifend'), 0);
          }
          console.log('섬  쿼리 : ' , datas);
          if(datas == false ){
            callback(null, 0);
          }else{
            callback(null, 1, datas);
          }
        });
      }else if(memberGender == 'M'){
        bindData.push(sum);
        bindData.push('(' +  req.session.memberNo + ')' );
        bindData.push('(' +  req.session.memberNo + ')' );
        bindData.push('(' +  req.session.memberNo + ')' );
        bindData.push('(' +  req.session.memberNo + ')' );
        bindData.push('(' +  req.session.memberNo + ')' );
        afeelQuery.afeelQuery(bindData, 'clearSpaceCheckMan', 'chat', function (err, datas) {
          if(datas == false || datas == undefined){
            callback(null, 0);
          }else{
            callback(null, 1, datas);
          }

        });
      }

    }, // 2번째 워터폴


    // 채팅방에 공간이 있으면 UPDATE 아니면 INSERT
    // successCode : 0 (INSERT)
    // successCode : 1 (UPDATE)
    function (successCode, rows, callback) {
      var bindData = [];
      console.log('3번째 워터폴 성공코드 : ', successCode);
      if(successCode == 0){
// 지금은 관리자 질문이없어서 xml에 강제로 4번의 질문을 랜덤하게 뿌려준다.
        if(memberGender == 'W'){
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          afeelQuery.afeelQuery(bindData, 'createChatRoomWomen', 'chat', function (err, datas) {
            if(err){
              console.error("에러원인 : " , err);
              callback(err, 0);
              return;
            }
            console.log('채팅방생성 여자', datas);
            callback(null, 1);
          });
        }else if(memberGender == 'M'){
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          afeelQuery.afeelQuery(bindData, 'createChatRoomMan', 'chat', function (err, datas) {
            callback(null, 1);
          });
        }

      }else if(successCode == 1){
        bindData.push(req.session.memberNo);
        bindData.push(sum);
        bindData.push(sum);
        bindData.push(sum);
        bindData.push(sum);
        bindData.push(req.session.memberNo);
        bindData.push(req.session.memberNo);
        if(memberGender == 'W'){
          afeelQuery.afeelQuery(bindData, 'modifyChatRoomWomenQuestionRandom', 'chat', function (err, datas) {

            // 여자빼고 남자4명이 차있으면 알림을 보내준다.(풀방이 되었으므로)
            if(rows[0].count == 4){
              gcmSetting.gcmSend([req.session.memberNo, rows[0].memberM1No, rows[0].memberM2No,rows[0].memberM3No,rows[0].memberM4No],
                {
                  gcmType : 'CHAT1WOMEN',
                  chatroomNo : rows[0].chatroomNo , profilThumbnail : [ rows[0].Man1Thumbnail, rows[0].Man2Thumbnail, rows[0].Man3Thumbnail , rows[0].Man4Thumbnail  ],
                  matchCount : rows[0].matchCount , memberNo : [rows[0].memberM1No, rows[0].memberM2No,rows[0].memberM3No,rows[0].memberM4No]
               });
            }

            callback(null, 1);
          });
        }else if(memberGender == 'M'){
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          bindData.push(sum);
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          afeelQuery.afeelQuery(bindData, 'modifyChatRoomMan', 'chat', function (err, datas) {


            /*이름 , 닉네임, 직업 , 나이 , 키 , 지역 , 취미,
              매칭성공횟수, 투표를 많이받은 호감도타입*/
            if(rows[0].memberWNo != 0 && rows[0].count == 3){
              gcmSetting.gcmSend([ rows[0].memberWNo,rows[0].memberM1No, rows[0].memberM2No,rows[0].memberM3No,rows[0].memberM4No ],
                {
                  gcmType : 'CHAT1MAN',
                  memberName : rows[0].memberName, memberNick : rows[0].memberNick,
                memberJob : rows[0].memberJob, memberAge : rows[0].memberAge, memberHeight:rows[0].memberHeight, memberAdd:rows[0].memberAdd, memberHobby : rows[0].memberHobby,
                feelingCode : [rows[0].feelingCode1, rows[0].feelingCode2, rows[0].feelingCode3]
                });
            }

            callback(null, 1);
          });
        }  // else if 종료

      }
//      callback(null, 1)
    } // 3번째 워터폴

  ], function (err, result) {
    console.log('마지막왓는데 ' , result);
    if(result == 1){
      console.log('소개받기 성공');
      res.json( { success:1 , message:'ok', result:'success'} );
    }else{
      console.log('발송 실패');
    }

  }); // 워터폴 종료부분




  res.json(util.successCode(res, 'success'));

});

module.exports = router;
