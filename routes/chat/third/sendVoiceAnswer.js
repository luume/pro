var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');
var afeelQuery = require('../../../afeel/util/afeelQuery');
var async = require('async');
var gcmSetting = require('../../../afeel/util/gcmSetting');
Array.prototype.removeElement = function(index)
{
    this.splice(index,1);
    return this;
};

var multer  = require('multer');
router.use(multer({
    dest: './public/rec/',
    rename: function (fieldname, filename) {
        return filename + Date.now() + '.jpg'
    }
}));

router.post('/', function(req, res){
    var chatroomNo = req.body.chatroomNo;
    var memberNo = req.session.memberNo;
    //if(chatroomNo == "" || chatroomNo == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[chatroomNo])", result:null});
    //    return;
    //}

    var voiceAnswerData = new Array(req.files.voiceAnswerData);
    //if(textAnwerData == "" || textAnwerData == undefined){
    //    res.json({success:0, message:"Error(빈값이 넘어왔습니다.[textAnwerData])", result:null});
    //    return;
    //}
    var questionNo = req.body.questionNo;

    var datas = [];
    datas.push('http://54.92.4.84:3000/rec/' + voiceAnswerData[0].name.split('.')[0] + '.mp4');
    datas.push(chatroomNo);
    datas.push(memberNo);
    datas.push(questionNo);

    var queryidname = 'sendVoiceAnswer';
    console.log('뉴어레이한값 ㅣ: ' , voiceAnswerData);
console.log('샌드보이스앤서', datas);

    async.waterfall([

        function (callback) {
            afeelQuery.afeelQuery(datas, queryidname , 'chat', function (err, datas) {
              callback(null);
            });
        },


        function (callback) {
            afeelQuery.afeelQuery([chatroomNo, req.session.memberNo], 'sendVoiceAnswerCount' , 'chat', function (err, datas) {

                var vCount = datas[0].voiceCount;
                callback(null, vCount);
            });
        },

        function (count, callback) {
            afeelQuery.afeelQuery([req.session.memberNo], 'genderMember' , 'member', function (err, datas) {

                callback(null, count , datas[0].memberGender);
            });
        },

        function (count, gender , callback) {
            afeelQuery.afeelQuery([chatroomNo], 'selectSecondChatMember' , 'chat', function (err, datas) {
                callback(null, count, gender, datas);
            });
        },

        function (count , gender, rows, callback) {
            afeelQuery.afeelQuery([chatroomNo], 'selectSecondAllChatMember' , 'chat', function (err, datas) {

                console.log(datas[0].memberM1No + ', ' + datas[0].memberM2No + ' , ' + datas[0].memberM3No + ' , ' + datas[0].memberM4No);
                var temps = [];
                temps.push(datas[0].memberM1No);
                temps.push(datas[0].memberM2No);
                temps.push(datas[0].memberM3No);
                temps.push(datas[0].memberM4No);

                var killIndex1 = temps.indexOf(rows[0].memberNo);

                temps.removeElement(killIndex1);

                var killIndex2 = temps.indexOf(rows[1].memberNo);
                temps.removeElement(killIndex2);
                temps.push(datas[0].memberWNo);

                callback(null, count, gender, temps);
            });
        },

    ], function (err, count, gender, temp) {
        if(err)console.error(err);

        if(count == 2 && gender == 'M'){
            gcmSetting.gcmSend([temp[2]], {gcmType 	: 'CHAT3WOMANSELECT',
                chatroomNo 	: chatroomNo
            });
            res.json(util.successCode(res, 'success'));
        }else if(gender == 'W'){
            res.json(util.successCode(res, 'success'));
            gcmSetting.gcmSend([temp[0], temp[1]], {gcmType 	: 'CHAT3MANWAIT',
                chatroomNo 	: chatroomNo
            });
        }
    });

});

module.exports = router;