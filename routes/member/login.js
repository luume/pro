var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.post('/', function(req, res){

    //res.json(util.successCode(res, 'success'));
    res.json({suceess : 1, message : 'ok', result : 'resultok'});
});

module.exports = router;