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

  var server_access_key = 'AlzaSyAgk159GSpKHuF3QsmXtkkYM2cP6gZenQ';

  var sender = new gcm.Sender(server_access_key);

  var registrationIds = [];


  //var registration_id = '안드로이드 registration_id 값';
  async.each(memberNoArray, function (sendId, callback) {
    afeel.afeelQuery([sendId], 'selectRegId', 'gcm', function (err, datas) {
      console.log('gcm regid = ', datas[0].registrationId);
      console.log('gcm Data = ', data);
      registrationIds.push(datas);
    });
  })


// At least one required

  //registrationIds.push(registration_id);




  /**

   * Params: message-literal, registrationIds-array, No. of retries, callback-function

   **/

  sender.send(message, registrationIds, 4, function (err, result) {

    console.log(result);

  });

}
