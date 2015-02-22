var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');
var gcmSetting = require('../../../afeel/util/gcmSetting');

var async = require('async');
Array.prototype.removeElement = function(index)
{
    this.splice(index,1);
    return this;
};

router.post('/', function(req, res){
    var chatroomNo = req.body.chatroomNo;
    var memberNo = req.session.memberNo;
    //if(chatroomNo == "" || chatroomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
    //    return;
    //}

    var textAnswerData = req.body.textAnswerData;
    var questionNo = req.body.questionNo;

    var datas = [];


    async.waterfall([

        function (callback) {
            afeelQuery.afeelQuery([req.session.memberNo], 'genderMember' , 'member', function (err, datas) {

                if(err)console.error(err);

                callback(null, datas[0].memberGender)

            });
        }, // 첫번째 워터폴


        function (memberGender , callback) {
            datas.push(textAnswerData);
            datas.push(chatroomNo);
            datas.push(memberNo);
            datas.push(questionNo);
            afeelQuery.afeelQuery(datas, 'sendTextAnswer' , 'chat', function (err, datas) {
                if(err)console.error(err);
                callback(null, 1, memberGender)

            });
        }, // 2번째 워터폴


        function (successCode, memberGender, callback) {
            if(successCode == 1){
                afeelQuery.afeelQuery([chatroomNo], 'insertCount' , 'chat', function (err, datas) {
                    if(err)console.error(err);
                    callback(null, datas[0].insertCount, memberGender)
                });
            } // if end
        },

        function (count, gender, callback) {
            afeelQuery.afeelQuery([chatroomNo], 'selectSecondChatMember' , 'chat', function (err, datas) {
                callback(null, count, gender, datas);
            });
        },

        function (count, gender, rows, callback) {
            afeelQuery.afeelQuery([chatroomNo], 'selectSecondAllChatMember' , 'chat', function (err, datas) {

                console.log(datas[0].memberM1No + ', ' + datas[0].memberM2No + ' , ' + datas[0].memberM3No + ' , ' + datas[0].memberM4No);
                var temps = [];
                temps.push(datas[0].memberM1No);
                temps.push(datas[0].memberM2No);
                temps.push(datas[0].memberM3No);
                temps.push(datas[0].memberM4No);

                var killIndex1 = temps.indexOf(rows[0].memberNo);

                temps.removeElement(killIndex1);

                temps.push(datas[0].memberWNo);

                callback(null, count, gender, temps);
            });
        },

    ], function (err, result, memberGender, temp) {

        if(err) console.error(err);

/*        if(memberGender == 'W' && result == 4){
            var aTemp = temp;
            aTemp.pop();
            gcmSetting.gcmSend(aTemp, { gcmType : 'CHAT2WOMANSELECT', chatroomNo : chatroomNo } );
            res.json(util.successCode(res, 'success'));
        }else if(memberGender == 'M' && result == 4){
            gcmSetting.gcmSend([temp[3]], { gcmType : 'CHAT2MANWAIT', chatroomNo : chatroomNo } );
            gcmSetting.gcmSend([temp[3]], { gcmType : 'CHAT2MANWAIT', chatroomNo : chatroomNo } );
            res.json(util.successCode(res, 'success'));
            *//*afeelQuery.afeelQuery([memberNo], 'selectChatMember' , 'chat', function (err, datas) {

                gcmSetting.gcmSend([datas[0].memberWNo], { gcmType : 'CHAT2WOMANSELECT', chatroomNo : chatroomNo } );
                res.json(util.successCode(res, 'success'));
            });
*//* 
        }else{
            res.json(util.successCode(res, 'success'));
        }*/
        if(result == 4) {
            console.log('복사열값 : ' + temp);
            var aTemp = temp;
            var bTemp = temp[3];
            console.log('템프3',temp[3]);
            console.log('템프4',bTemp);
            aTemp.pop();
            //284, 8 , 283 , 280
            gcmSetting.gcmSend([bTemp], {gcmType: 'CHAT2WOMANSELECT', chatroomNo: chatroomNo});
            gcmSetting.gcmSend(aTemp, {gcmType: 'CHAT2MANWAIT', chatroomNo: chatroomNo});
            res.json(util.successCode(res, 'success'));
        }else{
            res.json(util.successCode(res, 'success'));
        }
    });
/*

    var queryidname = 'sendTextAnswer';
    afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
        if (err) {
            res.json(err);
            return;
        }
        if (datas.affectedRows == 1) {
            res.json(util.successCode(res, 'success'));
        }else {
            res.json({success: 0, result: {message: '답변 전송에 실패'}});
            return;
        }
    });
    //if(textAnwerData == "" || textAnwerData == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[textAnwerData])", result:null});
    //    return;
    //}

    //res.json(util.successCode(res, 'success'));
*/

});

module.exports = router;