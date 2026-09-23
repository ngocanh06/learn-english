/**
 * scrape_playwright_v2.mjs
 * Playwright scraper for test-english.com with Cloudflare bypass
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const COOKIES = [
  { name: 'CookieConsent', value: "{stamp:'%27-1%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27implied%27%2Cver:6%2Cutc:1787583387399%2Ciab2:%27%27%2Cregion:%27VN%27}" },
  { name: '__gpi', value: 'UID=0000153cbfb0f95e:T=1787583394:RT=1789099295:S=ALNI_Mao3NPQHlfmNzlb4cpNS4RlvMm28A' },
  { name: 'connectId', value: '{"ttl":86400000,"lastUsed":1787583390901,"lastSynced":1787583390901}' },
  { name: 'nvq_hid', value: '70cc8704-a9a7-4972-a383-8d0fbd917f5d' },
  { name: '__eoi', value: 'ID=4a02f0ed1e7c17f3:T=1787583394:RT=1789099295:S=AA-AfjaGQMaB0Q8cGyije4NuY14A' },
  { name: '__gads', value: 'ID=f27e63b7f5a733ef:T=1787583394:RT=1789099295:S=ALNI_MYmGZwjao45Y1H4DqEAP-K7hJAeag' },
];

const BASE = 'd:/Dokumen/NgocAnh/learn-english/hoc-ngu-phap';
const OUTPUT_FILE = `${BASE}/scraped_reading_all.json`;
const HTML_DIR = `${BASE}/scraped_html`;

try { mkdirSync(HTML_DIR, { recursive: true }); } catch(e) {}

const LEVELS = ['a1', 'a2', 'b1'];

async function waitForReal(page, timeout = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const title = await page.title();
    if (!title.includes('Just a moment') && title !== 'test-english.com' && title !== '') {
      return true;
    }
    console.log(`      ⏳ Waiting for Cloudflare... title="${title}"`);
    await page.waitForTimeout(3000);
  }
  return false;
}

async function scrapePage(page, url) {
  console.log(`\n  → ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
  } catch(e) {
    console.log(`    goto error: ${e.message}, continuing...`);
  }

  // Wait for Cloudflare
  const loaded = await waitForReal(page);
  if (!loaded) throw new Error('Cloudflare not bypassed after 20s');
  
  // Extra wait for JS to render quiz
  await page.waitForTimeout(3000);
  
  const title = await page.title();
  console.log(`    Title: ${title}`);

  // Save raw HTML for offline processing
  const slug = url.split('/').filter(Boolean).pop();
  const html = await page.content();
  writeFileSync(join(HTML_DIR, `${slug}.html`), html, 'utf8');

  // Extract passage
  const passage = await page.evaluate(() => {
    const content = document.querySelector('.entry-content, .post-content, article .content');
    if (!content) return '';
    
    const paras = [];
    const children = [...content.querySelectorAll('p, blockquote, h2, h3, h4')];
    
    for (const el of children) {
      // Stop when we hit quiz/exercise section
      const cls = el.className || '';
      const id = el.id || '';
      if (cls.includes('nvq') || cls.includes('quiz') || id.includes('quiz')) break;
      
      // Check if parent is already in quiz area
      let parent = el.parentElement;
      let inQuiz = false;
      while (parent && parent !== content) {
        const pcls = parent.className || '';
        if (pcls.includes('nvq') || pcls.includes('quiz')) { inQuiz = true; break; }
        parent = parent.parentElement;
      }
      if (inQuiz) continue;
      
      const text = el.innerText?.trim();
      if (text && text.length > 10) paras.push(text);
    }
    
    return paras.join('\n\n');
  });
  console.log(`    Passage: ${passage.length} chars`);
  if (passage.length > 0) console.log(`    Preview: "${passage.substring(0, 100)}..."`);

  // Extract quiz questions
  const questions = await page.evaluate(() => {
    const qs = [];
    
    // Method 1: NVQ rendered quiz items
    const qEls = document.querySelectorAll('[class*="nvq-q"], .nvq-question, [class*="question"]');
    
    // Method 2: Radio button groups (most common on test-english)
    const inputs = document.querySelectorAll('input[type="radio"]');
    if (inputs.length > 0) {
      const groups = {};
      inputs.forEach(inp => {
        const name = inp.name;
        if (!groups[name]) groups[name] = { options: [], correct: -1 };
        // Get label text
        const labelEl = inp.closest('label') || document.querySelector(`label[for="${inp.id}"]`);
        const optText = labelEl ? labelEl.innerText.trim() : inp.value;
        
        // Check if this option is marked correct (some tests show after answer reveal)
        const isCorrect = inp.closest('.correct') || inp.checked || 
                          labelEl?.className?.includes('correct') || 
                          inp.getAttribute('data-correct') === 'true';
        
        groups[name].options.push({ text: optText, value: inp.value, isCorrect: !!isCorrect });
      });
      
      // Match with question texts
      // Questions are often in <p> or <legend> before the radio buttons
      const formEls = document.querySelector('form, .quiz, [class*="quiz"]');
      const questionTexts = [];
      
      if (formEls) {
        const pEls = formEls.querySelectorAll('p, legend, .q-text, [class*="question-text"]');
        pEls.forEach(el => {
          const text = el.innerText?.trim();
          if (text && /^\d+[.)]/.test(text)) questionTexts.push(text);
        });
      }
      
      Object.entries(groups).forEach(([name, group], idx) => {
        const correctIdx = group.options.findIndex(o => o.isCorrect);
        qs.push({
          q: questionTexts[idx] || `Question ${idx + 1}`,
          options: group.options.map(o => o.text),
          answer: correctIdx,
          explanation: ''
        });
      });
    }
    
    return qs;
  });
  console.log(`    Questions found: ${questions.length}`);

  return { url, title, passage, questions };
}

async function main() {
  console.log('Launching Playwright...');
  
  // Try with headless: false to better bypass Cloudflare
  const browser = await chromium.launch({ 
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox', 
      '--disable-blink-features=AutomationControlled',
    ]
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    locale: 'en-US',
    viewport: { width: 1366, height: 768 },
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });

  // Add cookies
  await context.addCookies(COOKIES.map(c => ({
    name: c.name,
    value: c.value,
    url: 'https://test-english.com',
    secure: true,
  })));

  // Remove automation indicators
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    window.chrome = { runtime: {} };
  });

  const page = await context.newPage();
  const allResults = {};

  for (const level of LEVELS) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Scraping ${level.toUpperCase()} reading tests`);
    console.log('='.repeat(50));

    try {
      await page.goto(`https://test-english.com/reading/${level}/`, { 
        waitUntil: 'domcontentloaded', timeout: 40000 
      });
      await waitForReal(page);
      await page.waitForTimeout(2000);

      const indexTitle = await page.title();
      console.log(`Index: ${indexTitle}`);

      // Get all reading test links
      const links = await page.evaluate((lvl) => {
        const as = document.querySelectorAll('a[href*="/reading/"]');
        const urls = [...new Set([...as].map(a => a.href))];
        return urls.filter(u => {
          // Must be a specific test page, not just the level index
          const parts = u.replace(/\/$/, '').split('/');
          const lastPart = parts[parts.length - 1];
          return u.includes(`/reading/${lvl}/`) && 
                 lastPart !== lvl && 
                 lastPart.length > 2 &&
                 !u.endsWith(`/reading/${lvl}/`);
        });
      }, level);

      console.log(`Found ${links.length} links for ${level.toUpperCase()}`);
      links.slice(0, 5).forEach(l => console.log(`  ${l}`));

      const levelResults = [];
      for (const url of links) {
        try {
          const data = await scrapePage(page, url);
          levelResults.push(data);
          
          // Save progress after each page
          allResults[level] = levelResults;
          writeFileSync(OUTPUT_FILE, JSON.stringify(allResults, null, 2), 'utf8');
          console.log(`    ✅ Saved (${levelResults.length} total)`);
        } catch(e) {
          console.error(`    ❌ Failed: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 2000));
      }

      allResults[level] = levelResults;
    } catch(e) {
      console.error(`Level ${level} ERROR: ${e.message}`);
    }
  }

  await browser.close();
  writeFileSync(OUTPUT_FILE, JSON.stringify(allResults, null, 2), 'utf8');
  
  console.log('\n' + '='.repeat(50));
  console.log('SUMMARY');
  console.log('='.repeat(50));
  for (const [lvl, tests] of Object.entries(allResults)) {
    const withPassage = tests.filter(t => t.passage.length > 50).length;
    const withQs = tests.filter(t => t.questions.length > 0).length;
    console.log(`${lvl.toUpperCase()}: ${tests.length} tests | ${withPassage} with passage | ${withQs} with questions`);
  }
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
