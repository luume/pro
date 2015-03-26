var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');
var gcmSetting = require('../../afeel/util/gcmSetting');
var async =require('async');
var afeelQuery = require('../../afeel/util/afeelQuery');
// 자기가한 질문으로 소개 받기
router.post('/:chatroomNo', function(req, res) {
  var chatroomNo = req.params.chatroomNo;

  async.waterfall([

      function(callback){
        afeelQuery.afeelQuery([], 'selectEndChatMember' , 'chat', function (err, datas) {
          if (err) {
            res.json(err);
            return;
          }

          callback(null, datas);
        });
      },

      function(row,callback){
        gcmSetting.gcmSend([], {gcmType 	: 'KILLCHAT1NOSELECT'})
      }

  ], function(err, result){

  });

  res.json(util.successCode(res, 'success'));

});

module.exports = router;
