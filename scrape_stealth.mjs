/**
 * scrape_stealth.mjs - Scrape test-english.com with stealth plugin
 */
import { chromium } from 'playwright-extra';
import StealthPlugin from 'playwright-extra-plugin-stealth';
import { writeFileSync, mkdirSync } from 'fs';

chromium.use(StealthPlugin());

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

async function waitForContent(page, timeout = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const title = await page.title();
    if (!title.includes('Just a moment') && title !== 'test-english.com' && title.trim() !== '') {
      console.log(`    ✓ Loaded: "${title}"`);
      return true;
    }
    process.stdout.write('.');
    await page.waitForTimeout(2000);
  }
  console.log('');
  return false;
}

async function extractPageData(page, url) {
  const slug = url.split('/').filter(Boolean).pop();

  // Save HTML for inspection
  const html = await page.content();
  writeFileSync(`${HTML_DIR}/${slug}.html`, html, 'utf8');

  const title = await page.$eval('h1', el => el.innerText.trim()).catch(() => page.title());

  // Extract passage - text before quiz widget
  const passage = await page.evaluate(() => {
    const content = document.querySelector('.entry-content');
    if (!content) return '';
    const parts = [];
    for (const el of content.children) {
      const cls = (el.className || '') + (el.id || '');
      if (/nvq|quiz|widget|ad-/i.test(cls)) break;
      const tag = el.tagName.toLowerCase();
      if (['p','blockquote','h2','h3','h4','ul','ol'].includes(tag)) {
        const txt = el.innerText?.trim();
        if (txt && txt.length > 8) parts.push(txt);
      }
    }
    return parts.join('\n\n');
  });

  // Extract quiz questions via radio inputs
  const questions = await page.evaluate(() => {
    const groups = {};
    document.querySelectorAll('input[type="radio"]').forEach(inp => {
      const n = inp.name || '_q';
      if (!groups[n]) groups[n] = [];
      const lbl = inp.closest('label') || document.querySelector(`label[for="${inp.id}"]`);
      groups[n].push(lbl?.innerText?.trim() || inp.value);
    });

    // Try to get question stems
    const stems = [];
    document.querySelectorAll('.entry-content p, .entry-content li').forEach(el => {
      const t = el.innerText?.trim();
      if (t && /^\d+[\.\)]\s/.test(t) && t.length > 5) stems.push(t);
    });

    return Object.values(groups).map((opts, i) => ({
      q: stems[i] || `Question ${i + 1}`,
      options: opts,
      answer: -1,
      explanation: ''
    }));
  });

  return { url, title, passage, questions };
}

async function main() {
  console.log('Launching stealth browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    locale: 'en-US',
    viewport: { width: 1366, height: 768 },
  });

  await context.addCookies(COOKIES.map(c => ({
    name: c.name, value: c.value,
    url: 'https://test-english.com', secure: true,
  })));

  const page = await context.newPage();
  const allResults = {};

  for (const level of ['a1', 'a2', 'b1']) {
    console.log(`\n=== ${level.toUpperCase()} ===`);
    await page.goto(`https://test-english.com/reading/${level}/`, { waitUntil: 'domcontentloaded', timeout: 40000 });
    await waitForContent(page);
    await page.waitForTimeout(1500);

    const links = await page.evaluate((lvl) => {
      return [...new Set([...document.querySelectorAll(`a[href*="/reading/${lvl}/"]`)].map(a => a.href))]
        .filter(u => !u.endsWith(`/${lvl}/`) && u.split('/').filter(Boolean).length > 4);
    }, level);

    console.log(`Found ${links.length} links`);
    const results = [];

    for (const url of links) {
      console.log(`\n  → ${url}`);
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
        const ok = await waitForContent(page);
        if (!ok) { console.log('    ❌ Cloudflare blocked'); continue; }
        await page.waitForTimeout(2000);

        const data = await extractPageData(page, url);
        console.log(`    passage: ${data.passage.length}ch | q: ${data.questions.length}`);
        if (data.passage.length > 50) console.log(`    "${data.passage.substring(0, 80)}..."`);
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

  console.log('\n=== SUMMARY ===');
  for (const [lvl, tests] of Object.entries(allResults)) {
    console.log(`${lvl.toUpperCase()}: ${tests.length} | passage: ${tests.filter(t=>t.passage.length>50).length} | q: ${tests.filter(t=>t.questions.length>0).length}`);
  }
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
