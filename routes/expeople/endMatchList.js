var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.get('/', function(req, res){
    //console.log('sdfsdfsdfsdfsdf');
    var m = util.createValueObject('Member');
    var cr = util.createValueObject('ChatRoom');
    var f = util.createValueObject('Feeling');
    var ft = util.createValueObject('Feeling_Type');
    var p = util.createValueObject('Profil');


  /*  profilSaveFileName : [ '../../images/Hydrangeas-thumbnail.jpg' , '../../images/Jellyfish-thumbnaill.jpg', '../../images/Koala-thumbnaill.jpg',
        '../../images/Penguins-thumbnail.jpg', '../../images/Lighthouse-thumbnail.jpg', '../../images/Tulips-thumbnail.jpg']*/
    res.json({
          success : 1,
          message : 'OK',
          result : [{
              memberName :  m.Member().memberName,
              memberBirth : m.Member().memberBirth,
              memberHobby : m.Member().memberHobby,
              memberAdd : m.Member().memberAdd,
              memberHeight : m.Member().memberHeight,
              memberJob : m.Member().memberJob,
              memberSNSYn : m.Member().memberSNSYn,
              memberEmailYn : m.Member().memberEmailYn,
              chatroomRegdate : m.ChatRoom().chatroomRegdate,
              fTypeArray : ['포근함', '스타일리쉬', '유머러스'],
              feelingRate : f.Feeling().feelingRate,
              profilSaveFileName : 'https://54.92.4.84/images/Hydrangeas-thumbnail.jpg'
          },
              {
                  memberName :  '김유신',
                  memberBirth : m.Member().memberBirth,
                  memberHobby : m.Member().memberHobby,
                  memberAdd : m.Member().memberAdd,
                  memberHeight : m.Member().memberHeight,
                  memberJob : m.Member().memberJob,
                  memberSNSYn : m.Member().memberSNSYn,
                  memberEmailYn : m.Member().memberEmailYn,
                  chatroomRegdate : m.ChatRoom().chatroomRegdate,
                  fTypeArray : ['훤칠한', '진지남', '유머러스'],
                  feelingRate : f.Feeling().feelingRate,
                  profilSaveFileName : 'https://54.92.4.84/images/Jellyfish-thumbnail.jpg'
              },
              {
                  memberName :  '이순신',
                  memberBirth : m.Member().memberBirth,
                  memberHobby : m.Member().memberHobby,
                  memberAdd : m.Member().memberAdd,
                  memberHeight : m.Member().memberHeight,
                  memberJob : m.Member().memberJob,
                  memberSNSYn : m.Member().memberSNSYn,
                  memberEmailYn : m.Member().memberEmailYn,
                  chatroomRegdate : m.ChatRoom().chatroomRegdate,
                  fTypeArray : ['슬림슬림', '스마트한', '귀여운'],
                  feelingRate : f.Feeling().feelingRate,
                  profilSaveFileName : 'https://54.92.4.84/images/Koala-thumbnail.jpg'
              },
              {
                  memberName :  '김말자',
                  memberBirth : m.Member().memberBirth,
                  memberHobby : m.Member().memberHobby,
                  memberAdd : m.Member().memberAdd,
                  memberHeight : m.Member().memberHeight,
                  memberJob : m.Member().memberJob,
                  memberSNSYn : m.Member().memberSNSYn,
                  memberEmailYn : m.Member().memberEmailYn,
                  chatroomRegdate : m.ChatRoom().chatroomRegdate,
                  fTypeArray : ['귀여운', '느낌있는', '시크도도'],
                  feelingRate : f.Feeling().feelingRate,
                  profilSaveFileName : 'https://54.92.4.84/images/Penguins-thumbnail.jpg'
              },
              {
                  memberName :  '김순자',
                  memberBirth : m.Member().memberBirth,
                  memberHobby : m.Member().memberHobby,
                  memberAdd : m.Member().memberAdd,
                  memberHeight : m.Member().memberHeight,
                  memberJob : m.Member().memberJob,
                  memberSNSYn : m.Member().memberSNSYn,
                  memberEmailYn : m.Member().memberEmailYn,
                  chatroomRegdate : m.ChatRoom().chatroomRegdate,
                  fTypeArray : ['스마트함', '청순한', '우아한'],
                  feelingRate : f.Feeling().feelingRate,
                  profilSaveFileName : 'https://54.92.4.84/images/Lighthouse-thumbnail.jpg'
              },
              {
                  memberName :  '김개똥',
                  memberBirth : m.Member().memberBirth,
                  memberHobby : m.Member().memberHobby,
                  memberAdd : m.Member().memberAdd,
                  memberHeight : m.Member().memberHeight,
                  memberJob : m.Member().memberJob,
                  memberSNSYn : m.Member().memberSNSYn,
                  memberEmailYn : m.Member().memberEmailYn,
                  chatroomRegdate : m.ChatRoom().chatroomRegdate,
                  fTypeArray : ['섹시한', '육감적인', '스마트한'],
                  feelingRate : f.Feeling().feelingRate,
                  profilSaveFileName : 'https://54.92.4.84/images/Tulips-thumbnail.jpg'
              }

          ]

      }

    );


});

module.exports = router;

/*

[
    util.successCode(res, {
        memberBirth : m.Member().memberBirth,
        memberHobby : m.Member().memberHobby,
        memberAdd : m.Member().memberAdd,
        memberHeight : m.Member().memberHeight,
        memberJob : m.Member().memberJob,
        memberSNSYn : m.Member().memberSNSYn,
        memberEmailYn : m.Member().memberEmailYn,
        chatroomRegdate : m.ChatRoom().chatroomRegdate,
        fTypeArray : ['귀여움', '장난스러움', '유머스러움'],
        feelingRate : f.Feeling().feelingRate,
        profilSaveFileName : '../../images/Hydrangeas-thumbnail.jpg'
    }),
]*/
