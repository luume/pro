var express = require('express');
var router = express.Router();

var util = require('../../afeel/util/vo');

router.post('/', function(req, res){

    req.session.destroy(function(err){
        if(err) console.error('err', err);
        res.json(util.successCode(res, 'success'));
        //global.afeelCon.release();
    });


});

module.exports = router;