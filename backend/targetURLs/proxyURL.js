const puppeteer = require('puppeteer');

// 프록시IP 크롤링
async function crawler() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080', '--disable-notifications'],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1080,
    height: 1080,
  });
  await page.goto('https://spys.one/en/free-proxy-list/');
  const proxies = await page.evaluate(() => {
    const ips = Array.from(document.querySelectorAll('tr > td:first-of-type > .spy14')).map((v) =>
      v.textContent.replace(/document\.write\(.+\)/, ''),
    );
    const types = Array.from(document.querySelectorAll('tr > td:nth-of-type(2)'))
      .slice(5)
      .map((v) => v.textContent);
    const latencies = Array.from(document.querySelectorAll('tr > td:nth-of-type(6) .spy1')).map(
      (v) => v.textContent,
    );
    return ips.map((v, i) => {
      return {
        ip: v,
        type: types[i],
        latency: latencies[i],
      };
    });
  });
  console.log(proxies);
  // 가장빠른 프록시 찾기
  const filtered = proxies.filter((v) =>
    v.type.startsWith('HTTP').sort((p, c) => p.latency - c.latency),
  );
  // 프록시 변경
  browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=1920,1080',
      '--disable-notifications',
      `--proxy-server=${(filtered[0], ip)}`,
    ],
  });

  await page.close();
  await page.close();
}

module.exports.crawler = crawler;
