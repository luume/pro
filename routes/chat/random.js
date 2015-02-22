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
  var test;
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
      console.log('rows :: ' , rows);
      var tempRows = rows;
      if(tempRows != undefined){
        if(tempRows.constructor == Object ){
          tempRows = new Array(tempRows);
        }
      }

      /*var sum = '(';
      for(var  i = 0; i < tempRows.length; i++){
        if(i == tempRows.length - 1 ){
          sum += tempRows[i].memberNo + ')';
          break;
        }
        sum += tempRows[i].memberNo + ',';
      }*/

      sum = [];
      var tempRowsLength = tempRows == undefined ? 0 : tempRows.length;
      for(var i = 0 ; i < tempRowsLength; i++){
        sum.push(parseInt(tempRows[i].memberNo,10));
      }

      test = sum.join(',');

/*
      if(sum ==  false){
        sum[0] = 0;
        test = sum;
      }*/


      console.log('sum 최종값 : ' , sum);

      var bindData = [];
      if(memberGender == 'W'){
        /*bindData.push(sum);
        bindData.push(sum);
        bindData.push(sum);
        bindData.push(sum);*/
        if(sum==false){
          bindData.push(0);
          bindData.push(0);
          bindData.push(0);
          bindData.push(0);
        }else {
          bindData.push(test);
          bindData.push(test);
          bindData.push(test);
          bindData.push(test);
        }
        bindData.push(req.session.memberNo);
        bindData.push(req.session.memberNo);
        console.log('join결과:' ,bindData);
        afeelQuery.afeelQuery(bindData, 'clearSpaceCheckWomen', 'chat', function (err, datas) {
    /*      if(err){
            console.error('sum 에러 : ' , err);
            callback(new Error('undeifend'), 0);
            return;
          }*/
          console.log('채팅방 공간 체크' , datas);
     /*     if( datas == undefined){
            callback(new Error('undeifend'), 0);
            return;
          }*/

          if(datas == false || datas == undefined){
              var dddd = typeof  callback === 'function';
              console.log('타입체크', dddd);
            callback(null, 0, []);
          }else{
            callback(null, 1, datas);
          }
        });
      }else if(memberGender == 'M'){
        bindData.push( req.session.memberNo  );
        bindData.push(  req.session.memberNo  );
        bindData.push(  req.session.memberNo  );
        bindData.push(test);
        bindData.push( req.session.memberNo  );
        bindData.push(  req.session.memberNo  );
        bindData.push(  req.session.memberNo  );
        bindData.push(  req.session.memberNo  );
        bindData.push(  req.session.memberNo  );
        afeelQuery.afeelQuery(bindData, 'clearSpaceCheckMan', 'chat', function (err, datas) {
          if(datas == false || datas == undefined){

            console.log('언디파인드 남자 에요', datas);
            var newbieBind = [];
            newbieBind.push( req.session.memberNo  );
            newbieBind.push(  req.session.memberNo  );
            newbieBind.push(  req.session.memberNo  );
            newbieBind.push( req.session.memberNo  );
            newbieBind.push(  req.session.memberNo  );
            newbieBind.push(  req.session.memberNo  );
            newbieBind.push(  req.session.memberNo  );
            newbieBind.push(  req.session.memberNo  );
            afeelQuery.afeelQuery(newbieBind, 'clearSpaceCheckMan2', 'chat', function (err, datas) {

              if(datas == false || datas == undefined) {
                console.log('언디파인드 남자 에요22', datas);
                callback(null, 0, []);
              }else{
                console.log('처음 뉴비에요', datas);
                callback(null, 1, datas, 'newbie');
              }
            });

          }else{
            callback(null, 1, datas);
          }

        });
      }

    }, // 2번째 워터폴


    // 채팅방에 공간이 있으면 UPDATE 아니면 INSERT
    // successCode : 0 (INSERT)
    // successCode : 1 (UPDATE)
    function (successCode, rows,newbie, callback) {
      var bindData = [];
      console.log('3번째 워터폴 성공코드 : ', successCode);
      if(successCode == 0){
// 지금은 관리자 질문이없어서 xml에 강제로 4번의 질문을 랜덤하게 뿌려준다.( 다시 ? 로 바인딩햇음)
        if(memberGender == 'W'){
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          //bindData.push(req.session.memberNo);
          //bindData.push(req.session.memberNo);
          afeelQuery.afeelQuery(bindData, 'createChatRoomWomen', 'chat', function (err, datas) {
            if(err){
              console.error("에러원인 : " , err);
              callback(err, 0);
              return;
            }
            console.log('채팅방생성 여자', datas);
            if(datas == undefined){
              console.log('채팅방 생성 여자 언디파인드');
            }
            callback(null, 1, 'womanInsert', [datas.insertId, req.session.memberNo]);
          });
        }else if(memberGender == 'M'){
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          afeelQuery.afeelQuery(bindData, 'createChatRoomMan', 'chat', function (err, datas) {
            callback(null, 1);
          });
        }

      }else if(successCode == 1){

        if(memberGender == 'W'){
          bindData.push(req.session.memberNo);
          bindData.push(test);
          bindData.push(test);
          bindData.push(test);
          bindData.push(test);
          bindData.push(req.session.memberNo);
          bindData.push(req.session.memberNo);
          afeelQuery.afeelQuery(bindData, 'modifyChatRoomWomenQuestionRandom', 'chat', function (err, datas) {
            if(err){
              console.error(err)
              callback(err, 0);
            };
//
            if(datas==undefined){
              console.log('아시발 여자 언디파인드');
            }
            // 여자빼고 남자4명이 차있으면 알림을 보내준다.(풀방이 되었으므로)
            if(rows[0].count == 4){
           /*   gcmSetting.gcmSend([req.session.memberNo, rows[0].memberM1No, rows[0].memberM2No,rows[0].memberM3No,rows[0].memberM4No],
                {
                  gcmType : 'CHAT1WOMEN',
                  chatroomNo : rows[0].chatroomNo , profilThumbnail : [ rows[0].Man1Thumbnail, rows[0].Man2Thumbnail, rows[0].Man3Thumbnail , rows[0].Man4Thumbnail  ],
                  matchCount : rows[0].matchCount , memberNo : [rows[0].memberM1No, rows[0].memberM2No,rows[0].memberM3No,rows[0].memberM4No]
               });*/
              gcmSetting.gcmSend([
                  req.session.memberNo
                ],
                {
                  gcmType     : 'CHAT1WOMEN',
                  chatroomNo : rows[0].chatroomNo
                });

              gcmSetting.gcmSend([
                  rows[0].memberM1No
                ],
                {
                  gcmType     : 'CHAT1MAN',
                  chatroomNo : rows[0].chatroomNo
                });

              gcmSetting.gcmSend([
                  rows[0].memberM2No
                ],
                {
                  gcmType     : 'CHAT1MAN',
                  chatroomNo : rows[0].chatroomNo
                });

              gcmSetting.gcmSend([
                  rows[0].memberM3No
                ],
                {
                  gcmType     : 'CHAT1MAN',
                  chatroomNo : rows[0].chatroomNo
                });

              gcmSetting.gcmSend([
                  rows[0].memberM4No
                ],
                {
                  gcmType     : 'CHAT1MAN',
                  chatroomNo : rows[0].chatroomNo
                });
            }
                var dddd = typeof  callback === 'function';
              console.log('타입체크', dddd);
              callback(null, 1, 'womanInsert', [rows[0].chatroomNo, req.session.memberNo]);


          });
        }else if(memberGender == 'M'){

          async.waterfall([

            function (calls) {
              if(newbie != 'newbie') {
                bindData = [];
                bindData.push(test);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                afeelQuery.afeelQuery(bindData, 'selectChatRoomIndexMan', 'chat', function (err, datas) {
                  calls(null, datas);
                });
              }else{
                bindData = [];
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                afeelQuery.afeelQuery(bindData, 'selectChatRoomIndexMan2', 'chat', function (err, datas) {
                  console.log('정확한 뉴비 데이터');
                  calls(null, datas, 'newbie');
                });
              }
            },

            function (row,newbie, calls) {
              bindData = [];

              if(row[0].memberM1No == 0){
                bindData.push(req.session.memberNo);
                bindData.push(null);
                bindData.push(null);
                bindData.push(null);
              }else if(row[0].memberM2No == 0){
                bindData.push(row[0].memberM1No);
                bindData.push(req.session.memberNo);
                bindData.push(null);
                bindData.push(null);
              }else if(row[0].memberM3No == 0){
                bindData.push(row[0].memberM1No);
                bindData.push(row[0].memberM2No);
                bindData.push(req.session.memberNo);
                bindData.push(null);
              }else if(row[0].memberM4No == 0){
                bindData.push(row[0].memberM1No);
                bindData.push(row[0].memberM2No);
                bindData.push(row[0].memberM3No);
                bindData.push(req.session.memberNo);
              }


              if(newbie != 'newbie') {
                bindData.push(test);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);

                afeelQuery.afeelQuery(bindData, 'modifyChatRoomMan', 'chat', function (err, datas) {

                  console.log('3번쨰 워터폴 남자 업데이트 값 ', datas);
                  /*이름 , 닉네임, 직업 , 나이 , 키 , 지역 , 취미,
                   매칭성공횟수, 투표를 많이받은 호감도타입*/
                  if (rows[0].memberWNo != 0 && rows[0].count == 3) {
                    console.log('회원 배열값 : ', [rows[0].memberWNo
                      , rows[0].memberM1No == undefined ? req.session.memberNo : rows[0].memberM1No
                      , rows[0].memberM2No == undefined ? req.session.memberNo : rows[0].memberM2No
                      , rows[0].memberM3No == undefined ? req.session.memberNo : rows[0].memberM3No
                      , rows[0].memberM4No == undefined ? req.session.memberNo : rows[0].memberM4No]);
                    gcmSetting.gcmSend([
                          rows[0].memberWNo
                        ],
                        {
                          gcmType: 'CHAT1WOMEN',
                          chatroomNo: rows[0].chatroomNo
                        });

                    gcmSetting.gcmSend([
                          rows[0].memberM1No == undefined ? req.session.memberNo : rows[0].memberM1No
                        ],
                        {
                          gcmType: 'CHAT1MAN',
                          chatroomNo: rows[0].chatroomNo
                        });

                    gcmSetting.gcmSend([
                          rows[0].memberM2No == undefined ? req.session.memberNo : rows[0].memberM2No
                        ],
                        {
                          gcmType: 'CHAT1MAN',
                          chatroomNo: rows[0].chatroomNo
                        });

                    gcmSetting.gcmSend([
                          rows[0].memberM3No == undefined ? req.session.memberNo : rows[0].memberM3No
                        ],
                        {
                          gcmType: 'CHAT1MAN',
                          chatroomNo: rows[0].chatroomNo
                        });

                    gcmSetting.gcmSend([
                          rows[0].memberM4No == undefined ? req.session.memberNo : rows[0].memberM4No
                        ],
                        {
                          gcmType: 'CHAT1MAN',
                          chatroomNo: rows[0].chatroomNo
                        });
                  }
                  //calls(null,1);
                  callback(null, 1);
                });
              }else if(newbie=='newbie'){
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);
                bindData.push(req.session.memberNo);

                afeelQuery.afeelQuery(bindData, 'modifyChatRoomMan2', 'chat', function (err, datas) {

                  console.log('3번쨰 워터폴 남자 업데이트 값 ', datas);
                  /*이름 , 닉네임, 직업 , 나이 , 키 , 지역 , 취미,
                   매칭성공횟수, 투표를 많이받은 호감도타입*/
                  if (rows[0].memberWNo != 0 && rows[0].count == 3) {
                    console.log('회원 배열값 : ', [rows[0].memberWNo
                      , rows[0].memberM1No == undefined ? req.session.memberNo : rows[0].memberM1No
                      , rows[0].memberM2No == undefined ? req.session.memberNo : rows[0].memberM2No
                      , rows[0].memberM3No == undefined ? req.session.memberNo : rows[0].memberM3No
                      , rows[0].memberM4No == undefined ? req.session.memberNo : rows[0].memberM4No]);
                    gcmSetting.gcmSend([
                          rows[0].memberWNo
                        ],
                        {
                          gcmType: 'CHAT1WOMEN',
                          chatroomNo: rows[0].chatroomNo
                        });

                    gcmSetting.gcmSend([
                          rows[0].memberM1No == undefined ? req.session.memberNo : rows[0].memberM1No
                        ],
                        {
                          gcmType: 'CHAT1MAN',
                          chatroomNo: rows[0].chatroomNo
                        });

                    gcmSetting.gcmSend([
                          rows[0].memberM2No == undefined ? req.session.memberNo : rows[0].memberM2No
                        ],
                        {
                          gcmType: 'CHAT1MAN',
                          chatroomNo: rows[0].chatroomNo
                        });

                    gcmSetting.gcmSend([
                          rows[0].memberM3No == undefined ? req.session.memberNo : rows[0].memberM3No
                        ],
                        {
                          gcmType: 'CHAT1MAN',
                          chatroomNo: rows[0].chatroomNo
                        });

                    gcmSetting.gcmSend([
                          rows[0].memberM4No == undefined ? req.session.memberNo : rows[0].memberM4No
                        ],
                        {
                          gcmType: 'CHAT1MAN',
                          chatroomNo: rows[0].chatroomNo
                        });
                  }
                  //calls(null,1);
                  callback(null, 1);
                });
              }
            } // 2번째 워터폴

         /*   function (calls) {
              afeelQuery.afeelQuery(bindData, 'modifyChatRoomMan', 'chat', function (err, datas) {

              });
            } // 3번째 워터폴*/

          ]);



        }  // else if 종료

      }
//      callback(null, 1)
    } // 3번째 워터폴

  ], function (err, result, code, queryArgument) {

    if(err)console.error(err);

    if(result == 1 && code == 'womanInsert'){
      afeelQuery.afeelQuery(queryArgument, 'womanRankInsert', 'chat', function (err, datas) {
        if(err)console.error(err);
      });
    }

    console.log('마지막왓는데 ' , result);
    if(result == 1){
      console.log('소개받기 성공');
      res.json( { success:1 , message:'ok', result:'success'} );
    }else{
      console.log('발송 실패');
    }

  }); // 워터폴 종료부분




  //res.json(util.successCode(res, 'success'));

});

module.exports = router;
