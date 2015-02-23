var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');
var async = require('async');

router.get('/', function(req, res) {

    var isSuccess = util.sessionCheck(req);
  //  console.log('endmatCh2', req.session.memberNo);
   /* if (!isSuccess) {
        res.send('<script>alert("session undefinded");</script>');
        return;
    }*/

    var memberEmail = req.body.memberEmail;
 // console.log('엔드매치세션아이디ss = ' , req.session.memberNo);



  //  console.log('datas', datas);

    /*async.waterfall([

          function (callback) {
              afeelQuery.afeelQuery(datas, queryidname, function (err, data1) {
                  if (err) {
                      res.json(err);
                      return;
                  }
                  callback(null, data1);
              }); // 쿼리종료
          }, // 1번함수

          function (data2, callback) {
              afeelQuery.afeelQuery([], queryidname, function (err, data2) {
                  //callback(null, data2);
                  callback(null, data2);
              }); // 쿼리종료
          } // 2번 함수

      ],
      function (err, result) {
            // res.json 으로 실질적으로 쏴주는곳
      });*/
    var queryidname = 'endMatchList';
    var temp;

    //var count = 0;
    async.waterfall([

            function (call) {
                afeelQuery.afeelQuery([req.session.memberNo], 'filteringMember', 'expeople', function (err, memberNo) {
                    /*if(err){
                        //   console.log('에러',err);
                        //res.json(err);
                        console.log('여기서 걸리네 ㅡㅡ');
                        count = 0;
                        call(null);
                        return;
                    }*/
                  console.log('엔드매치 세션값 : ' , req.session.memberNo);
                    console.log('첫번째 쿼리 memberNo결과값 = ',memberNo);
                    //  console.log('0번쨰 워터폴 함수', gender);
                    //call(null, gender[0].memberGender);

                    if(memberNo === false || memberNo === undefined || memberNo === null){
                        console.log('여자의 if문 카운트는 ' , memberNo);
                        call(null,0);
                    }else{
                        console.log('여자의 else 카운트는 ' , memberNo);
                       call(null, 1);
                    }

                    //call(null, count);
                });

            },

            function (count, call) {
                console.log('워터폴 인자로 넘어온 count 값 = ' , count);
                global.queryName = 'member';
                afeelQuery.afeelQuery([req.session.memberNo], 'genderMember', 'member', function (err, gender) {
                   /* if(err){
                     //   console.log('에러',err);
                        res.json(err);
                        return;
                    }*/
                  //  console.log('0번쨰 워터폴 함수', gender);
                    call(null, gender[0].memberGender, count);
                });
            },


            function (gender,count, call) {
                var datas = [];
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
                datas.push(req.session.memberNo);
              //  console.log('엔드매치 실행전');
                global.queryName = 'expeople';
                if(gender == 'M'){
                    console.log('남자다');
                    if(count == 0){
                        afeelQuery.afeelQuery(datas, 'endMatchListM', 'expeople', function (err, datarow) {
                            if(err){
                           //     console.log('에러',err);
                                res.json(err);
                                return;
                            }
                           console.log('남자인데 카운트 = 0', datarow);
                            call(null, datarow)
                        });
                    }else if(count == 1){
                        afeelQuery.afeelQuery(datas, 'endMatchListMFilter', 'expeople', function (err, datarow) {
                            if(err){
                                //     console.log('에러',err);
                                res.json(err);
                                return;
                            }
                            // console.log('첫번쨰 워터폴 함수', datarow);
                          console.log('남자인데 카운트 != 0', datarow);
                            call(null, datarow)
                        });
                    }else{
                        console.log('남자엘즈문');
                        call(new Error('남자엘즈문'), null);
                    }
                }else if(gender == 'W') {
                    datas.pop();
                    if(count == 0){
                        afeelQuery.afeelQuery(datas, 'endMatchListW', 'expeople', function (err, datarow) {
                            if (err) {
                                console.log('에러', err);
                                res.json(err);
                                return;
                            }
                          //  console.log('첫번쨰 워터폴 함수', datarow);
                            call(null, datarow)
                        });
                    }else if(count == 1){
                        console.log('데이터스 = ', datas);
                        afeelQuery.afeelQuery(datas, 'endMatchListWFilter', 'expeople', function (err, datarow) {
                            if (err) {
                                console.log('에러', err);
                                res.json(err);
                                return;
                            }
                            console.log('첫번쨰 워터폴 함수', datarow);
                            call(null, datarow)
                        });
                    }else{
                        console.log('여자엘즈문');
                        call(new Error('여자엘즈문'), null);
                    }
                }
            },

            function (datarow, call) {
                var ar = [];
                var j =0;
                for(var i =0 ; i < datarow.length; i ++){
                    ar.push(datarow[i].memberNo);
                }
                temp = datarow;
                async.eachSeries(ar, function (memberNoArray, callback) {

                    afeelQuery.afeelQuery([ req.session.memberNo,memberNoArray], 'myRate1' , 'expeople', function (err, data) {
                        if(err){
                            res.json(err);

                            return;
                        }
                      //  console.log('2번쨰 워터폴 함수', data);
                        if(data == false ){
                            call(null, 0);
                            return;
                        }

                        temp[j].memberRate = data[0].memberRate;
                        j++;
                        callback();
                /*        async.each(datarow, function (row, callback) {
                            //  console.log('이치 row ' , row);
                            //    console.log('datas[j].rank = ' , datas[0].rank);
                            console.log('이치문 돔');
                            temp[j].memberRate = row;
                            callback();
                            j++;
                        }, function(err){
                            console.log('temp는 ', temp);
                            callback();
                        });*/

                    }); // 쿼리

                }, function(err){
                    call(null, 1);
                });


            } // 2번쨰워터폴종료
            
        ],
        function (err, result) {
           // console.log('마지막 temp ', temp);
            if(result==1){
                console.log('성공코드 : ' + temp);
                res.json({success:1 , message:'ok', result : temp});
            }else{
              //  console.log('망햇어요 ㅡㅡ');
                res.json({success:1 , message:'ok', result : temp});
               /* afeelQuery.afeelQuery([req.session.memberNo], 'myRate2' , function (err, data) {
                    if(err){
                        res.json(err);
                        return;
                    }

                    res.json({success:1 , message:'ok', result : temp});
                });*/

            }

        }
    ); // 워터폴엔드
/*
    afeelQuery.afeelQuery([req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo,req.session.memberNo], queryidname , function (err, datas) {
        if(err){
            res.json(err);
            return;
        }
        //res.json(datas);
        afeelQuery.afeelQuery([req.session.memberNo], 'myRank' , function (err, data) {
            if(err){
                res.json(err);

                return;
            }
            if(datas == false){
                res.json({ success : 0 , message : '데이터 없음', result : null});

                return;
            }
         *//*   if(datas.length == 0){
                console.log('진행중인 이성 에러코드 발생');
           //     console.log({ success : 0 , message : '에러 발생', result : [ null ] });
                res.json({ success : 0 , message : '에러 발생', result : [ null ] });
                return;
            }
*//*
          *//*(function () {
            for(var j = 0 ; j < datas.length; j++){
              console.log(datas[j].rank + ' = ' + data[j].rank);
              datas[j].rank = data[j].rank;
            }
          })();*//*
          var j = 0;
          //console.log('datas = ', datas);
          async.each(data, function (row, callback) {
          //  console.log('이치 row ' , row);
        //    console.log('datas[j].rank = ' , datas[0].rank);
          if(datas[j] == undefined){
              res.json(err);
              return;
          } else {
              datas[j].rank = row.rank;
              j++;
              callback();
          }


          }, function(err){
          //  console.log('모두 성공');
            //console.log('arr', arr);

            //conn.release();
            //res.json({result:arr});
          });


            //var fType = datas[0].fType;

            //var fTypeArray = fType.split(',');

           // datas[0].fType = fTypeArray;
          //console.log('길이',datas.length);
            //console.log('진행중인 이성의 데이터 값ss  = ', {success:1 , message:'ok', result : datas});

            res.json({success:1 , message:'ok', result : datas});

        });
    });*/


});

router.post('/:chartroomNo', function(req, res) {
    var chartroomNo = req.params.chartroomNo;
    var deleteMemberNo = req.body.memberNo;
    console.log('진행중인 이성 삭제 진입', chartroomNo );
    console.log('진행중인 이성 삭제 진입', deleteMemberNo );
    afeelQuery.afeelQuery([req.session.memberNo, deleteMemberNo, chartroomNo], 'insertFiltering', 'expeople', function (err, gender) {
        if(err){
            console.log('에러',err);
            res.json(err);
            return;
        }
        res.json({success : 1 , message : 'ok', result:  'success'  });
    });
});


router.get('/reset', function(req, res) {

    afeelQuery.afeelQuery([], 'reset',  'expeople', function (err, gender) {
        if(err){
            console.log('에러',err);
            res.json(err);
            return;
        }
        res.json({success : 1 , message : 'ok', result:  'success'  });
    });
});

module.exports = router;
