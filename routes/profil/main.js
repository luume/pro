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
        profilOriginalFileName  : pro.Profil().profilOriginalFileName
    }));
});

module.exports = router;

