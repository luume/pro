var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

// 질문 저장
router.post('/', function(req, res) {

  var memberNo = req.session.memberNo;
  var questionData = req.body.questionData;
  var questionGuide = req.body.questionGuide;

  var datas = [];
  datas.push(memberNo);
  datas.push(questionData);
  datas.push(questionGuide);

  global.queryName = 'myquestion';
  var queryidname = 'regMyquestion';

  global.pool.getConnection(function (err, conn) {
    conn.beginTransaction(function (err) {
      afeelQuery.afeelQuery(datas, queryidname , function (err, row) {
        if(err){
          res.json(err);
          return;
        }
        if(row.affectedRows == 1){
          res.json(util.successCode(res, '[success]'));
        }
        else{
          res.json(err);
          return;
        }
      });
    }); // 트랜잭션 종료
  });


  res.json(util.successCode(res,'[success]'));
});

module.exports = router;
