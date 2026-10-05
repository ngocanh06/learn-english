/**
 * scrape_with_playwright.mjs
 * Use Playwright headless browser with real cookies to scrape test-english.com reading tests
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const COOKIES = [
  { name: 'CookieConsent', value: "{stamp:'%27-1%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27implied%27%2Cver:6%2Cutc:1787583387399%2Ciab2:%27%27%2Cregion:%27VN%27}", domain: 'test-english.com', path: '/' },
  { name: '__gpi', value: 'UID=0000153cbfb0f95e:T=1787583394:RT=1789099295:S=ALNI_Mao3NPQHlfmNzlb4cpNS4RlvMm28A', domain: '.test-english.com', path: '/' },
  { name: 'connectId', value: '{"ttl":86400000,"lastUsed":1787583390901,"lastSynced":1787583390901}', domain: '.test-english.com', path: '/' },
  { name: 'nvq_hid', value: '70cc8704-a9a7-4972-a383-8d0fbd917f5d', domain: 'test-english.com', path: '/' },
  { name: '__eoi', value: 'ID=4a02f0ed1e7c17f3:T=1787583394:RT=1789099295:S=AA-AfjaGQMaB0Q8cGyije4NuY14A', domain: '.test-english.com', path: '/' },
  { name: '__gads', value: 'ID=f27e63b7f5a733ef:T=1787583394:RT=1789099295:S=ALNI_MYmGZwjao45Y1H4DqEAP-K7hJAeag', domain: '.test-english.com', path: '/' },
];

const LEVELS = ['a1', 'a2', 'b1'];
const OUTPUT_FILE = 'd:/Dokumen/NgocAnh/learn-english/hoc-ngu-phap/scraped_reading_all.json';



  // Extract title
  const title = await page.$eval('h1', el => el.textContent.trim()).catch(() => '');
  console.log(`    Title: ${title}`);

  // Extract the reading passage
  // test-english puts the passage in entry-content before the quiz widget
  const passage = await page.evaluate(() => {
    // Try to find passage in entry-content
    const content = document.querySelector('.entry-content');
    if (!content) return '';
    
    // Get all paragraphs before the quiz
    const quiz = content.querySelector('[class*="quiz"], [id*="quiz"], [data-id*="nvq"], .nvq-quiz');
    const paras = [];
    
    // Walk through children collecting text before the quiz
    const children = content.children;
    for (const child of children) {
      if (quiz && child.contains(quiz)) break;
      if (quiz && child === quiz) break;
      
      const tag = child.tagName.toLowerCase();
      if (['p', 'blockquote', 'div', 'h2', 'h3', 'h4'].includes(tag)) {
        const text = child.innerText?.trim();
        if (text && text.length > 10 && !text.match(/^(Reading|Advertisement|Skip)/i)) {
          paras.push(text);
        }
      }
    }
    
    // If nothing found before quiz, just get all text that looks like a passage
    if (paras.length === 0 && content) {
      const allPs = content.querySelectorAll('p');
      for (const p of allPs) {
        const text = p.innerText?.trim();
        if (text && text.length > 30) paras.push(text);
        // Stop if we hit question-like content
        if (text?.match(/^\d+\.\s+[A-Z]/) || text?.match(/^(Question|Quiz)/i)) break;
      }
    }
    
    return paras.join('\n\n');
  });
  console.log(`    Passage: ${passage.length} chars`);

  // Try to click "Check answers" to reveal correct answers, then extract questions
  // First get questions before submission
  const questionsData = await page.evaluate(() => {
    const questions = [];
    
    // Method 1: Look for NVQ quiz structure (test-english's quiz system)
    // Questions are usually in radio button groups
    const questionDivs = document.querySelectorAll('[class*="nvq"], .quiz-question, [data-question]');
    
    // Method 2: Find form elements with radio buttons
    const forms = document.querySelectorAll('form');
    for (const form of forms) {
      const radioGroups = {};
      const radios = form.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
        const name = radio.name;
        if (!radioGroups[name]) radioGroups[name] = [];
        radioGroups[name].push({
          value: radio.value,
          label: radio.closest('label')?.textContent?.trim() || radio.nextSibling?.textContent?.trim() || radio.value
        });
      });
      
      // Get question texts
      const questionTexts = form.querySelectorAll('.question-text, [class*="question"], legend, h3, h4, p strong');
      
      Object.entries(radioGroups).forEach(([name, options], idx) => {
        const qText = questionTexts[idx]?.textContent?.trim() || `Question ${idx + 1}`;
        questions.push({
          q: qText,
          options: options.map(o => o.label),
          answer: -1,
          name
        });
      });
    }
    
    return questions;
  });

  // Try to submit and get correct answers
  let finalQuestions = questionsData;
  
  if (questionsData.length === 0) {
    // Try another approach: look at the page source for quiz data
    const pageSource = await page.content();
    
    // Look for nvq quiz data in scripts
    const nvqMatch = pageSource.match(/nvqQuizData\s*=\s*(\[[\s\S]*?\]);/) ||
                     pageSource.match(/"questions"\s*:\s*(\[[\s\S]*?\])/);
    if (nvqMatch) {
      try {
        const qData = JSON.parse(nvqMatch[1]);
        console.log(`    Found quiz JSON with ${qData.length} items`);
      } catch(e) {}
    }
  }

  // Extract visible question text directly from the DOM
  const visibleQuestions = await page.evaluate(() => {
    const questions = [];
    
    // Find all numbered questions visible on page
    // test-english typically shows: "1. Which city does..."
    const allText = document.querySelector('.entry-content')?.innerHTML || '';
    
    // Look for numbered list items or numbered paragraphs
    const numbered = [...document.querySelectorAll('.entry-content li, .entry-content p')]
      .filter(el => /^\d+[\.\)]/.test(el.textContent?.trim()));
    
    // Also look for div/label structures for radio options
    const radioLabels = document.querySelectorAll('label');
    const radioGroups = {};
    radioLabels.forEach(label => {
      const radio = label.querySelector('input[type="radio"]') || label.previousElementSibling;
      if (radio?.type === 'radio') {
        const name = radio.name || 'q0';
        if (!radioGroups[name]) radioGroups[name] = [];
        const text = label.textContent.trim().replace(/\s+/g, ' ');
        if (text) radioGroups[name].push(text);
      }
    });
    
    // Also try to find the correct answers from any existing correct class
    const correctEls = document.querySelectorAll('.correct, [class*="correct"], .right-answer');
    
    return {
      numbered: numbered.map(el => el.textContent.trim()),
      radioGroups,
      correctEls: [...correctEls].map(el => el.textContent.trim()),
      rawHtml: document.querySelector('.entry-content')?.innerHTML?.substring(0, 5000) || ''
    };
  });

  console.log(`    Radio groups: ${Object.keys(visibleQuestions.radioGroups).length}`);
  console.log(`    Numbered items: ${visibleQuestions.numbered.length}`);

  return {
    url,
    title,
    passage,
    questions: finalQuestions,
    rawData: visibleQuestions,
  };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    locale: 'en-US',
    viewport: { width: 1280, height: 720 },
  });
  
  // Set cookies - Playwright needs url field only
  const cookieUrl = 'https://test-english.com';
  await context.addCookies(COOKIES.map(c => ({
    name: c.name,
    value: c.value,
    url: cookieUrl,
    secure: true,
  })));
  
  const page = await context.newPage();
  const allResults = {};

  for (const level of LEVELS) {
    console.log(`\n=== Scraping ${level.toUpperCase()} reading tests ===`);
    const indexUrl = `https://test-english.com/reading/${level}/`;
    
    try {
      await page.goto(indexUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);
      
      const status = page.url();
      const title = await page.title();
      console.log(`  Index page: ${title}`);
      console.log(`  URL: ${status}`);
      
      // Check if page loaded correctly
      const h1 = await page.$eval('h1', el => el.textContent).catch(() => '');
      console.log(`  H1: ${h1}`);
      
      // Extract all reading test links
      const links = await page.evaluate((level) => {
        const anchors = document.querySelectorAll('a[href*="/reading/' + level + '/"]');
        const urls = [...new Set([...anchors].map(a => a.href))];
        return urls.filter(u => {
          const parts = u.split('/').filter(Boolean);
          return parts.length > 4 && !u.endsWith(`/reading/${level}/`);
        });
      }, level);
      
      console.log(`  Found ${links.length} links`);
      links.forEach(l => console.log(`    ${l}`));
      
      const levelResults = [];
      for (const url of links.slice(0, 20)) { // max 20 per level
        try {
          const data = await scrapePage(page, url);
          levelResults.push(data);
          
          // Save progress incrementally
          allResults[level] = levelResults;
          writeFileSync(OUTPUT_FILE, JSON.stringify(allResults, null, 2), 'utf8');
        } catch(e) {
          console.error(`    ERROR: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 1000));
      }
      
      allResults[level] = levelResults;
    } catch(e) {
      console.error(`  ERROR loading index: ${e.message}`);
    }
  }

  await browser.close();
  writeFileSync(OUTPUT_FILE, JSON.stringify(allResults, null, 2), 'utf8');
  console.log(`\n✅ Done! Saved to ${OUTPUT_FILE}`);
  
  // Print summary
  for (const [level, tests] of Object.entries(allResults)) {
    console.log(`${level.toUpperCase()}: ${tests.length} tests`);
    tests.forEach(t => console.log(`  - ${t.title} (passage: ${t.passage.length}ch, q: ${t.questions.length})`));
  }
}

main().catch(err => { console.error(err); process.exit(1); });
