//필요한 모듈들을 가져오기
const schedule = require('node-schedule');
const redis = require('redis');
const puppeteer = require('puppeteer');
const { proxyCrawl } = require('./targetURLs/proxyURL');

//레디스 클라이언트 생성
const redisClient = redis.createClient({
  host: 'redis-server',
  post: 6379,
});
// mysql 연결
const mysqlDB = require('./db');

// 프록시 3일에 한번 갱신 (일요일, 수요일 / 12시)
// 프록시IP 크롤링, 프록시IP 레디스에 저장
schedule.scheduleJob('0 0 12 * * 0,3', function () {
  let proxyIP = proxyCrawl();
  proxyIP.then(function (result) {
    console.log(result);
    redisClient.set('proxyIP', result);
  });
});

// 매일 아침 6시 갱신
schedule.scheduleJob('0 0 6 * * *', function () {
  // 프록시IP 크롤링
  redisClient.get('proxyIP', function (err, value) {
    if (err) throw err;
    console.log(value);
  });
});

// 뉴스 크롤링 후 DB저장
schedule.scheduleJob('40 30 * * * *', function () {
  console.log('매 30분에 실행');
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
