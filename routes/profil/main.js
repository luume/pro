var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.get('/', function(req, res){


    var m = util.createValueObject('Member');
    var pro = util.createValueObject('Profil');

    res.json( util.successCode(res, {
        memberName : m.Member().memberName,
        memberBirth : m.Member().memberBirth,
        memberHobby : m.Member().memberHobby,
        memberAdd : m.Member().memberAdd,
        memberJob : m.Member().memberJob,
        memberHeight : m.Member().memberHeight,
        profilOriginalFileName  : ['https://54.92.4.84/images/Hydrangeas-thumbnail.jpg',
            'https://54.92.4.84/images/Jellyfish-thumbnail.jpg',
            'https://54.92.4.84/images/Koala-thumbnail.jpg',
            'https://54.92.4.84/images/Penguins-thumbnail.jpg',
            'https://54.92.4.84/images/Lighthouse-thumbnail.jpg']
    }));
});

module.exports = router;

