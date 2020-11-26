//필요한 모듈들을 가져오기
const schedule = require('node-schedule');
const redis = require('redis');
const puppeteer = require('puppeteer');
const { crawler } = require('./targetURLs/proxyURL');
//레디스 클라이언트 생성
// const redisClient = redis.createClient({
//   host: 'redis-server',
//   post: 6379,
// });
// redisClient.set('number', 12);

const mysqlDB = require('./db');

// 실행 테스트
// crawler();

// 프록시IP 크롤링, 프록시IP 레디스에 저장 , 스케줄 설정
// schedule.scheduleJob('0 20 * * * *', function () {
//   console.log('매 20분에 실행');
//   // 프록시IP 크롤링
// });

// 뉴스 크롤링 후 DB저장
// schedule.scheduleJob('40 30 * * * *', function () {
//   console.log('매 30분에 실행');
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
