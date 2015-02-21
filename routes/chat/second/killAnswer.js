var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');

var gcmSetting = require('../../../afeel/util/gcmSetting');

var async =require('async');


Array.prototype.removeElement = function(index)
{
    this.splice(index,1);
    return this;
};

router.post('/', function(req, res){

    var memberNo = req.body.memberNo; //죽일 남성 번호
    var chatroomNo = req.body.chatroomNo; //해당 채팅방 번호
    var rank = 3;

    var datas = [];
    datas.push(memberNo);
    datas.push(chatroomNo);
    datas.push(rank);

    var queryidname = 'killMan';

    async.waterfall([
        function (callback) {
            afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
                if (err) {
                    res.json(err);
                    return;
                }

                callback(null, datas);
            });
        }, // 첫번쨰 워터폴 종료

        function (row, callback) {
            if (row.affectedRows == 1) {

                var pushNoArray = [];
                async.waterfall([

                    function (callback) {
                        afeelQuery.afeelQuery([chatroomNo], 'selectSecondChatMember1' , 'chat', function (err, datas) {
                            callback(null, datas);
                        });
                    },

                    function (rows, callback) {
                        afeelQuery.afeelQuery([chatroomNo], 'selectSecondAllChatMember' , 'chat', function (err, datas) {

                            console.log(datas[0].memberM1No + ', ' + datas[0].memberM2No + ' , ' + datas[0].memberM3No + ' , ' + datas[0].memberM4No);
                            var temps = [];
                            temps.push(datas[0].memberM1No);
                            temps.push(datas[0].memberM2No);
                            temps.push(datas[0].memberM3No);
                            temps.push(datas[0].memberM4No);

                            var killIndex1 = temps.indexOf(datas[0]);

                            temps.removeElement(killIndex1);

                            var killIndex2 = temps.indexOf(datas[1]);
                            temps.removeElement(killIndex2);
                            temps.push(datas[0].memberWNo);

                            callback(null, temps);
                        });
                    },

                    function (temp , callback) {
                        console.log('전송값 temp : ' , temp);
                        gcmSetting.gcmSend([temp[0], temp[1]], {gcmType 	: 'CHAT3MAN',
                            chatroomNo 	: chatroomNo
                        });

                        gcmSetting.gcmSend([temp[2].memberWNo], {gcmType 	: 'CHAT3WOMAN',
                            chatroomNo 	: chatroomNo
                        });

                        gcmSetting.gcmSend([memberNo], {gcmType 	: 'CHAT2MANFAIL',
                            chatroomNo 	: chatroomNo
                        });

                        callback(null, 1);
                    }

                ], function (err, result) {
                    callback(null,1);
                });

            } // 1if end

        } // 2번째 워터폴
    ], function (err, result) {
        if(err) console.error(err);

        if(result == 1){
            res.json(util.successCode(res, 'success'));
        }else{
            res.json({success: 0, result: {message: '3등 탈락자 선정에 실패'}});
        }

    });
});

module.exports = router;