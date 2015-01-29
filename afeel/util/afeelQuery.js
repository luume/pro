var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');
var xml_digester = require("xml-digester");
var digester = xml_digester.XmlDigester({});


/**
 * mybatis 같이 xml 파일로 쿼리를 읽어오고 실행하기 위한 모듈
 * @param bindQuery             읽어들일 sql 파일의 경로명     .xml 까지 할 필요없이 파일명만 적으면된다.
 * @param callback (err, row)   err : 에러 일경우를 위한 매개변수. null이면 에러가 발생하지않음.
 *                                       row : 정상처리되었을 경우 쿼리의 결과가 담김
 */
exports.afeelQuery = function(bindQuery , queryId,  callback) {

  fs.readFile(global.directoryPath + global.queryName + '.xml','utf8', function(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log('file read');
      digester.digest(data, function(error, result) {
        if (error) {
          console.log(error);
        } else {

          //var query = util.format(result.query.searchdata);
          var query;
          var queryIdLength = result.query.myquery.length;
          for(var i = 0 ; i < result.query.myquery.length; i++){
            if(result.query.myquery[i].id == queryId){
              query = util.format(result.query.myquery[i]._text);
              break;
            }
          } // for end

          global.pool.getConnection(function(err, conn) {
            if(err) console.error('err >>>>>', err);

            conn.query(query, bindQuery,  function(err, row) {

              if(err){
                callback(
                  {
                    success: 0,
                    message: {type: 'SQL Exception', message: err},
                    result : null
                  }
                );
              };
            //} // if end
              callback(null, row);
          });

          });

        }
      });

    }

  });


};  // afeelQuery end

