var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.post('/', function(req, res){
    console.log('스토어 리차지!!!!!!!')

    res.json(util.successCode(res, 'success'));

});

module.exports = router;