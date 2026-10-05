/**
 * scrape_final.mjs - Playwright visible browser to bypass Cloudflare
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

const COOKIES = [
  { name: 'CookieConsent', value: "{stamp:'%27-1%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27implied%27%2Cver:6%2Cutc:1787583387399%2Ciab2:%27%27%2Cregion:%27VN%27}" },
  { name: '__gpi', value: 'UID=0000153cbfb0f95e:T=1787583394:RT=1789099295:S=ALNI_Mao3NPQHlfmNzlb4cpNS4RlvMm28A' },
  { name: 'connectId', value: '{"ttl":86400000,"lastUsed":1787583390901,"lastSynced":1787583390901}' },
  { name: 'nvq_hid', value: '70cc8704-a9a7-4972-a383-8d0fbd917f5d' },
  { name: '__eoi', value: 'ID=4a02f0ed1e7c17f3:T=1787583394:RT=1789099295:S=AA-AfjaGQMaB0Q8cGyije4NuY14A' },
  { name: '__gads', value: 'ID=f27e63b7f5a733ef:T=1787583394:RT=1789099295:S=ALNI_MYmGZwjao45Y1H4DqEAP-K7hJAeag' },
];

const BASE = 'd:/Dokumen/NgocAnh/learn-english/hoc-ngu-phap';
const HTML_DIR = `${BASE}/scraped_html`;
const OUTPUT_FILE = `${BASE}/scraped_reading_all.json`;

try { mkdirSync(HTML_DIR, { recursive: true }); } catch(e) {}

async function waitForContent(page, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const title = await page.title();
    if (!title.includes('Just a moment') && title !== 'test-english.com' && title.trim() !== '') {
      return true;
    }
    process.stdout.write('.');
    await page.waitForTimeout(2000);
  }
  console.log('');
  return false;
}

async function extractData(page, url) {
  const slug = url.split('/').filter(Boolean).pop();
  const html = await page.content();
  writeFileSync(`${HTML_DIR}/${slug}.html`, html, 'utf8');

  const h1 = await page.$eval('h1', el => el.innerText.trim()).catch(() => '');

  const passage = await page.evaluate(() => {
    const content = document.querySelector('.entry-content');
    if (!content) return '';
    const parts = [];
    for (const el of content.children) {
      const cls = (el.className || '') + (el.id || '');
      if (/nvq|quiz|widget|shortcode|iframe/i.test(cls)) break;
      const tag = el.tagName.toLowerCase();
      if (['p', 'blockquote', 'h2', 'h3', 'h4'].includes(tag)) {
        const txt = el.innerText?.trim();
        if (txt && txt.length > 8) parts.push(txt);
      }
    }
    return parts.join('\n\n');
  });

  const questions = await page.evaluate(() => {
    const groups = {};
    document.querySelectorAll('input[type="radio"]').forEach(inp => {
      if (!groups[inp.name]) groups[inp.name] = [];
      const lbl = inp.closest('label') || document.querySelector(`label[for="${inp.id}"]`);
      groups[inp.name].push(lbl?.innerText?.trim() || inp.value);
    });

    // Question stems
    const stems = [];
    document.querySelectorAll('.entry-content p, .nvq-question, [class*="question"]').forEach(el => {
      const t = el.innerText?.trim();
      if (t && /^\d+[\.\)]\s/.test(t)) stems.push(t);
    });

    return Object.values(groups).map((opts, i) => ({
      q: stems[i] || `Question ${i + 1}`,
      options: opts.filter(Boolean),
      answer: -1,
      explanation: ''
    })).filter(q => q.options.length > 1);
  });

  return { url, title: h1, passage, questions };
}

async function main() {
  console.log('Launching visible Chrome (headless:false to bypass Cloudflare)...');
  
  const browser = await chromium.launch({
    headless: false,  // VISIBLE browser - bypasses Cloudflare Turnstile
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    locale: 'en-US',
    viewport: { width: 1280, height: 800 },
  });

  await context.addCookies(COOKIES.map(c => ({
    name: c.name, value: c.value,
    url: 'https://test-english.com', secure: true,
  })));

  // Patch automation detection
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    Object.defineProperty(navigator, 'plugins', { get: () => [1,2,3,4,5] });
    window.chrome = { runtime: {}, loadTimes: () => {}, csi: () => {} };
  });

  const page = await context.newPage();
  const allResults = {};

  for (const level of ['a1', 'a2', 'b1']) {
    console.log(`\n${'='.repeat(50)}\n${level.toUpperCase()}\n${'='.repeat(50)}`);

    await page.goto(`https://test-english.com/reading/${level}/`, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await waitForContent(page);
    await page.waitForTimeout(2000);

    const indexTitle = await page.title();
    console.log(`Index: ${indexTitle}`);

    const links = await page.evaluate((lvl) => {
      return [...new Set([...document.querySelectorAll(`a[href*="/reading/${lvl}/"]`)].map(a => a.href))]
        .filter(u => !u.endsWith(`/${lvl}/`) && u.replace(/\/$/, '').split('/').filter(Boolean).length > 4);
    }, level);
    console.log(`Found ${links.length} test links`);

    const results = [];
    for (const url of links) {
      console.log(`\n  → ${url}`);
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
        const ok = await waitForContent(page, 25000);
        if (!ok) { console.log('    ❌ Still blocked'); continue; }
        await page.waitForTimeout(2000);

        const data = await extractData(page, url);
        console.log(`    Title: ${data.title}`);
        console.log(`    Passage: ${data.passage.length}ch | Questions: ${data.questions.length}`);
        results.push(data);

        allResults[level] = results;
        writeFileSync(OUTPUT_FILE, JSON.stringify(allResults, null, 2), 'utf8');
      } catch(e) {
        console.error(`    ❌ ${e.message}`);
      }
      await new Promise(r => setTimeout(r, 1500));
    }
    allResults[level] = results;
  }

  await browser.close();
  writeFileSync(OUTPUT_FILE, JSON.stringify(allResults, null, 2), 'utf8');

  console.log('\n=== DONE ===');
  for (const [lvl, tests] of Object.entries(allResults)) {
    const ok = tests.filter(t => t.passage.length > 50).length;
    console.log(`${lvl.toUpperCase()}: ${tests.length} tests | ${ok} with passage`);
  }
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
