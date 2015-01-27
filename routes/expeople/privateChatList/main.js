var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');

router.get('/', function(req, res){


    var m = util.createValueObject('Member');
    var pm = util.createValueObject('Private_Message');
    var p = util.createValueObject('Profil');

    util.successCode(res, {
        memberName : m.Member().memberName,
        messageData : pm.Private_Message().messageData,
        messageDate : pm.Private_Message().messageDate,
        profilSaveFileName : p.Profil().profilSaveFileName
    });
});

module.exports = router;