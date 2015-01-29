/**
 * Created by skplanet on 2015-01-28.
 */
var mysql = require('mysql');
global.pool = mysql.createPool({
  connectionLimit: 150,
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'test'
});
console.log('글로벌');