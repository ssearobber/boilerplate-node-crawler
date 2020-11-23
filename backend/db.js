const mysql = require('mysql');
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'crawler',
// });
const connection = mysql.createConnection({
  host: 'devfactory.fun',
  user: 'root',
  password: 'example',
  database: 'tamastudy',
  port: 33333,
});
exports.connection = connection;
