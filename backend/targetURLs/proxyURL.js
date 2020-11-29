const puppeteer = require('puppeteer');

// 프록시IP 크롤링
async function proxyCrawl() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--window-size=1920,1080',
      '--disable-notifications',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1080,
    height: 1080,
  });
  await page.goto('https://spys.one/free-proxy-list/JP/');
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
  // 가장빠른 프록시 찾기
  const filtered = proxies
    .filter((v) => v.type.startsWith('HTTP'))
    .sort((p, c) => p.latency - c.latency);
  await page.close();
  await browser.close();
  // 프록시 변경
  // browser = await puppeteer.launch({
  //   headless: false,
  //   args: [
  //     '--window-size=1920,1080',
  //     '--disable-notifications',
  //     `--proxy-server=${filtered[0].ip}`,
  //   ],
  // });
  return filtered[0].ip;
}

module.exports.proxyCrawl = proxyCrawl;
