const fs = require('fs');
const playwright = require("playwright");

const URLS = [
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/1-1000",
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/1001-2000",
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/2001-3000",
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/3001-4000",
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/4001-5000",
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/5001-6000",
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/6001-7000",
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/7001-8000",
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/8001-9000",
  "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/9001-10000"
]

async function getFrequencyList(page, url) {
  await page.goto(url);
  return page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr'));
    rows.shift();
    const mapped = rows.map(row => {
      const cells = row.querySelectorAll('td');
      return {
        traditional: cells[0].innerText,
        simplified: cells[1].innerText,
        pinyin: cells[2].innerText,
        meaning: cells[3].innerText,
      }
    });

    return JSON.stringify(mapped);
  });
}

(async () => {
  const browser = await playwright.webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const lists = [];

  try {
    for (let i = 0; i < URLS.length; i++) {
      const url = URLS[i];
      const list = await getFrequencyList(page, url);
      lists.push(list);
    }

    const flattened = [].concat.apply([], lists.map(JSON.parse));
    fs.writeFileSync('frequency.json', JSON.stringify(flattened, null, 2));
  } catch (e) {
    console.log(e);
    await page.screenshot({ path: 'error.png' });
  } finally {
    await browser.close();
  }
})()
