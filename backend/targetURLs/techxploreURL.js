const puppeteer = require('puppeteer');

async function techxploreCrawl(proxy) {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=1920,1080',
      '--disable-notifications',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--proxy-server=${proxy}`,
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1080,
    height: 1080,
  });
  await page.goto('https://techxplore.com/internet-news/sort/liverank/all/');
  const proxies = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('article > div > h2 > a')).map(
      (v) => v.textContent,
    );
    const contents = Array.from(document.querySelectorAll('article > div > p')).map(
      (v) => v.textContent,
    );
    return titles.map((v, i) => {
      return {
        title: v,
        content: contents[i],
      };
    });
  });
}

module.exports.techxploreCrawl = techxploreCrawl;
