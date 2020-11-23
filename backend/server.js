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

const j = schedule.scheduleJob('40 30 * * * *', function () {
  console.log('매 14분에 실행');
  redisClient.get('number', (err, number) => {
    console.log('number', number);
  });
  mysqlDB.connection.query('SELECT * FROM news', function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    mysqlDB.connection.end();
    console.log(results);
  });
});

//DB lists 테이블에 있는 모든 데이터를 프론트 서베에 보내주기
app.get('/api/hi', function (req, res) {
  //데이테베이스에서 모든 정보 가져오기
  res.status(200).send('good');
});

//DB lists 테이블에 있는 모든 데이터를 프론트 서베에 보내주기
app.get('/api/values', function (req, res) {
  console.log('test', '가져오기');
  //데이테베이스에서 모든 정보 가져오기
  // db.connection.connect();

  // db.connection.query('SELECT * FROM lists', function (err, results, fields) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   db.connection.end();
  //   return res.json(results);
  // });
  // console.log('test', '끝');
});

// 클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 넣어주기
app.post('/api/value', function (req, res, next) {
  console.log(`test : ${req.body.value}`);
  //데이터베이스에 값 넣어주기
  db.connection.connect();

  db.connection.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      db.connection.end();
      return res.json({ success: true, value: req.body.value });
    },
  );
});

app.listen(5000, () => {
  console.log('애플리케이션이 5000번 포트에서 시작되었습니다.');
});
