//필요한 모듈들을 가져오기
const express = require('express');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const redis = require('redis');
//레디스 클라이언트 생성
const redisClient = redis.createClient({
  host: 'redis-server',
  post: 6379,
});
redisClient.set('number', 12);

const mysqlDB = require('./db');

//Express 서버를 생성
const app = express();
// json 형대토 오는 요청의 본문을 해석해줄수있게 등록
app.use(bodyParser.json());

// const j = schedule.scheduleJob('40 30 * * * *', function () {
//   console.log('매 14분에 실행');
//   redisClient.get('number', (err, number) => {
//     console.log('number', number);
//   });
//   mysqlDB.connection.query('SELECT * FROM news', function (err, results, fields) {
//     if (err) {
//       console.log(err);
//     }
//     mysqlDB.connection.end();
//     console.log(results);
//   });
// });

app.get('/api/hi', function (req, res, next) {
  // console.log(`test : ${req.body.value}`);
  //데이터베이스에 값 넣어주기
  // db.connection.connect();
  return res.json({ success: true, value: '배포성공' });
  // db.connection.query(
  //   `INSERT INTO lists (value) VALUES("${req.body.value}")`,
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     db.connection.end();
  //     return res.json({ success: true, value: req.body.value });
  //   },
  // );
});
app.listen(5000, () => {
  console.log('애플리케이션이 5000번 포트에서 시작되었습니다.');
});
