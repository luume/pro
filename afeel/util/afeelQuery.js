var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');
var xml_digester = require("xml-digester");
var digester = xml_digester.XmlDigester({});

var async = require('async');

/**
 * mybatis 같이 xml 파일로 쿼리를 읽어오고 실행하기 위한 모듈
 * @param bindQuery             읽어들일 sql 파일의 경로명     .xml 까지 할 필요없이 파일명만 적으면된다.
 * @param callback (err, row)   err : 에러 일경우를 위한 매개변수. null이면 에러가 발생하지않음.
 *                                       row : 정상처리되었을 경우 쿼리의 결과가 담김
 */
var query;
exports.afeelQuery = function(bindQuery , queryId,  callback) {
  //console.log('확인');
  fs.readFile(global.directoryPath + global.queryName + '.xml','utf8', function(error, data) {
    if (error) {
      console.log(error);
    } else {

      async.waterfall([
        function (callback) {

          digester.digest(data, function(error, result) {
            if (error) {
              console.log(error);
            } else {

              var tobj = {};
              tobj = result.query.myquery;
              //console.log('xml',result.query.myquery);
              //console.log('렝스',result.query.myquery.length);
              var count = 0;
              var k;
              for (k in tobj) {
                if (tobj.hasOwnProperty(k)) {
                  //console.log(tobj.hasOwnProperty(k));
                  count++;
                }
              }
              for(var i = 0 ; i < count; i++){
                if(result.query.myquery.length == undefined){
                  if(result.query.myquery.id == queryId){
                    query = util.format(result.query.myquery._text);
                    break;
                  }
                }

                if(result.query.myquery[i].id == queryId){
                  query = util.format(result.query.myquery[i]._text);
                  break;
                }
              } // for end


            }
          });
          callback(null, query);
        }
      ], function (err, result) {



        global.pool.getConnection(function(err, conn) {
          if (err) console.error('err 발생 >>>>>', err);


          //  global.afeelCon.beginTransaction(function(err) {
          conn.query(query, bindQuery, function (err, row) {

            if (err) {
              //global.afeelCon.release();
              console.log(queryId + ' =  ' + err);
              callback(
                {
                  success: 0,
                  message: err,
                  result : null
                }
              );

              return;
            }
            ;

            if (row.affectedRows == 0 || row == null || row == undefined || row == false) {
              //global.afeelCon .release();
              console.log('0행입니다.');
              global.isQuerySuccess = false;
              conn.release();

              callback(
                {
                  success: 0,
                  message: 'SQL 실행 결과가 존재하지 않습니다.',
                  result : null
                }
              );
              return;
            }

            //} // if end
            //  console.log('쿼리결과', row);
            global.isQuerySuccess = true;
            conn.release();
            //conn.release();
            callback(null, row);
          }); // 쿼리 문 종료

        });


        }
      );


    }

  });


};  // afeelQuery end


exports.releaseCon = function (con) {
  con.release();
};

