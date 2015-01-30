var express = require('express');
var router = express.Router();

var util = require('../../../afeel/util/vo');

router.get('/', function(req, res){


    var m = util.createValueObject('Member');
    var pm = util.createValueObject('Private_Message');
    var p = util.createValueObject('Profil');

    res.json({
            success : 1,
            message : 'OK',
            result : [{
                memberName :  m.Member().memberName,
                messageData : pm.Private_Message().messageData,
                messageDate : pm.Private_Message().messageDate,
                profilSaveFileName : 'https://54.92.4.84/images/Hydrangeas-thumbnail.jpg'
            },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Jellyfish-thumbnail.jpg'
                },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Koala-thumbnail.jpg'
                },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Penguins-thumbnail.jpg'
                },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Lighthouse-thumbnail.jpg'
                },
                {
                    memberName :  m.Member().memberName,
                    messageData : pm.Private_Message().messageData,
                    messageDate : pm.Private_Message().messageDate,
                    profilSaveFileName : 'https://54.92.4.84/images/Tulips-thumbnail.jpg'
                }

            ]

        }

    );
    //

    //
});

module.exports = router;