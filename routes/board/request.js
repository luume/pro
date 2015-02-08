var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var afeelQuery = require('../../afeel/util/afeelQuery');

//문의 등록
router.post('/', function(req, res){

    var memberNo = req.session.memberNo;
    var requestTitle = req.body.requestTitle;
    //if(requestTitle == "" || requestTitle == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[requestTitle])", result:null});
    //    return;
    //}
    var requestContent = req.body.requestContent;
    //if(requestContent == "" || requestContent == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[requestContent])", result:null});
    //    return;
    //}
   var datas = [];
   datas.push(memberNo);
   datas.push(requestTitle);
   datas.push(requestContent);

   global.queryName = 'board';
   var queryidname = 'regRequest';

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

});

module.exports = router;