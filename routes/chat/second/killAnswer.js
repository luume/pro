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
    console.log('2단계 죽일 남성 번호 : ' , memberNo);

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
                        afeelQuery.afeelQuery([chatroomNo], 'selectSecondChatMember' , 'chat', function (err, datas) {
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


                            var killIndex1 = temps.indexOf(memberNo);
                            console.log('지울 인덱스 번호11 : ' , killIndex1);
                            console.log('리무브 전 배열 : ' + temps);

                            temps.removeElement(killIndex1);
                            console.log('리무브 후 배열 : ' + temps);
                            temps.push(datas[0].memberWNo);
                            console.log('리무브 후 여자 넣은 후 배열 : ' + temps);
                            callback(null, temps);
                        });
                    },

                    function (temp, callback) {
                        afeelQuery.afeelQuery([chatroomNo], 'selectKillMember' , 'chat', function (err, datas) {

                            var killIndex = temp.indexOf(datas[0].memberNo);
                            console.log('지울 인덱스 번호222 : ' , killIndex);
                            var temps = [];
                            temps = temp;
                            temps.removeElement(killIndex);
                            console.log('2번째 리무브 후 배열 : ' + temps);
                            callback(null, temps);

                        });
                    },

                    function (temp , callback) {
                        console.log('킬앤서 배열값 : ',  temp);
                        gcmSetting.gcmSend([temp[0], temp[1]], {gcmType 	: 'CHAT3MAN',
                            chatroomNo 	: chatroomNo
                        });

                        gcmSetting.gcmSend([temp[2]], {gcmType 	: 'CHAT3WOMAN',
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