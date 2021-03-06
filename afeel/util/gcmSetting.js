var gcm = require('node-gcm');

var afeel = require('./afeelQuery');
var async = require('async');
exports.gcmSend = function(memberNoArray, data){
  // create a message with default values
  var message = new gcm.Message();

// or with object values
  var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    data: data
  });
                                   // AIzaSyAgk159GSpKHuF3QsmXtkkfYM2cP6gZeNQ
  var server_access_key = 'AIzaSyCWd8UtktPIY6XGRy3p5ABSL1BjQ1Z1SYU';  // 서버 키

  var sender = new gcm.Sender(server_access_key);



  var registrationIds = [];
  //var registration_id = '안드로이드 registration_id 값';
  async.waterfall([
    function (callback) {
      async.each(memberNoArray, function (sendId, call) {
        console.log('gcmSend ID : ', sendId);
        afeel.afeelQuery([sendId], 'selectRegId', 'gcm', function (err, datas) {
          if(err)console.error(err);
          //console.log('gcm regid = ', datas[0].registrationId);
          console.log('gcm Data = ', data);


          async.eachSeries(datas, function (sendId, callback) {
            registrationIds.push(sendId.registrationId);
            callback();
          })

          call();
        });
      }, function (err) {
        callback(null)
      })
    },

    function (callback) {
      sender.send(message, registrationIds, 4, function (err, result) {
        console.log('RegId 체크 = ' , registrationIds);
        if(err) console.error('err = ' , err);

        console.log('리절트 = ', result);
        callback(null, 1);
      });

    }
  ], function (err, result) {
      if(result == 1){
        console.log('발신 성공');
      }
  });



// At least one required

  //registrationIds.push(registration_id);




  /**

   * Params: message-literal, registrationIds-array, No. of retries, callback-function

   **/




}
