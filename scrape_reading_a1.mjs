/**
 * scrape_reading_v2.mjs
 * Scrape test-english.com reading tests with proper headers
 */
import { writeFileSync, readFileSync } from 'fs';

const COOKIE_STR = [
  `CookieConsent={stamp:%27-1%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27implied%27%2Cver:6%2Cutc:1787583387399%2Ciab2:%27%27%2Cregion:%27VN%27}`,
  `__gpi=UID=0000153cbfb0f95e:T=1787583394:RT=1789099295:S=ALNI_Mao3NPQHlfmNzlb4cpNS4RlvMm28A`,
  `connectId={"ttl":86400000,"lastUsed":1787583390901,"lastSynced":1787583390901}`,
  `nvq_hid=70cc8704-a9a7-4972-a383-8d0fbd917f5d`,
  `__eoi=ID=4a02f0ed1e7c17f3:T=1787583394:RT=1789099295:S=AA-AfjaGQMaB0Q8cGyije4NuY14A`,
  `__gads=ID=f27e63b7f5a733ef:T=1787583394:RT=1789099295:S=ALNI_MYmGZwjao45Y1H4DqEAP-K7hJAeag`,
].join('; ');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'sec-ch-ua': '"Chromium";v="125", "Not.A/Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'none',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'Cookie': COOKIE_STR,
};

function htmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractContent(html, url) {
  // Extract title
  const titleMatch = html.match(/<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i)
    || html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch ? htmlToText(titleMatch[1]) : url.split('/').filter(Boolean).pop();
  
  // Find the article/entry content
  const entryMatch = html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)(?:<div[^>]*class="[^"]*(?:widget|sidebar|footer)[^"]*"|<\/article>)/i);
  const contentHtml = entryMatch ? entryMatch[1] : html;

  // Extract passage - look for the reading text before the quiz
  // Usually in <p> tags or a highlighted block before the questions
  let passageHtml = '';
  
  // Split at the quiz/questions section
  const quizSplit = contentHtml.split(/(?:<div[^>]*(?:id|class)="[^"]*(?:quiz|question|nvq)[^"]*")|(?:data-id="nvq)/i);
  if (quizSplit.length > 0) {
    passageHtml = quizSplit[0];
  }
  
  // Extract paragraphs from passage area
  const paraMatches = [...passageHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
  const paras = paraMatches
    .map(m => htmlToText(m[1]).trim())
    .filter(p => p.length > 20);
  
  let passage = paras.join('\n\n');
  if (!passage) passage = htmlToText(passageHtml).substring(0, 3000);

  // Extract questions from the NVQ quiz structure
  // test-english uses a proprietary quiz system
  const questions = [];
  
  // Method 1: Look for NVQ question data in script tags
  const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const sm of scriptMatches) {
    const sc = sm[1];
    // Look for question arrays
    if (sc.includes('"question"') || sc.includes("'question'")) {
      try {
        // Extract JSON-like structures
        const qMatches = [...sc.matchAll(/"question"\s*:\s*"([^"]+)"/g)];
        const aMatches = [...sc.matchAll(/"answers"\s*:\s*\[([\s\S]*?)\]/g)];
        const correctMatches = [...sc.matchAll(/"correct"\s*:\s*(\d+)/g)];
        
        qMatches.forEach((qm, idx) => {
          const q = qm[1];
          const answers = aMatches[idx] ? 
            [...aMatches[idx][1].matchAll(/"([^"]+)"/g)].map(m => m[1]) : [];
          const correct = correctMatches[idx] ? parseInt(correctMatches[idx][1]) : -1;
          if (q && answers.length > 0) {
            questions.push({ q, options: answers, answer: correct, explanation: '' });
          }
        });
      } catch(e) {}
    }
  }
  
  // Method 2: Look for nvqJSON or similar embedded data
  const nvqJsonMatch = html.match(/var\s+nvqOptions\s*=\s*(\{[\s\S]*?\});\s*\n/);
  if (nvqJsonMatch) {
    try {
      const data = JSON.parse(nvqJsonMatch[1]);
      console.log('  nvqOptions:', JSON.stringify(data).substring(0, 200));
    } catch(e) {}
  }
  
  // Method 3: Parse visible HTML questions (li elements with options)
  if (questions.length === 0) {
    // Find ol/ul lists that contain question options
    const listMatches = [...contentHtml.matchAll(/<ol[^>]*>([\s\S]*?)<\/ol>/gi)];
    for (const lm of listMatches) {
      const items = [...lm[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
        .map(m => htmlToText(m[1]).trim())
        .filter(t => t.length > 0);
      if (items.length >= 4 && items.length <= 6) {
        // This looks like a question + options
        questions.push({
          q: `Question ${questions.length + 1}`,
          options: items,
          answer: -1,
          explanation: ''
        });
      }
    }
  }

  return { title, passage, questions };
}

async function fetchPage(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (res.ok) return await res.text();
      if (res.status === 403) {
        console.log(`    403 on attempt ${i+1}, trying with different approach...`);
        // Try without cookie on retry
        const headers2 = { ...HEADERS };
        if (i === 1) delete headers2.Cookie;
        const res2 = await fetch(url, { headers: headers2 });
        if (res2.ok) return await res2.text();
      }
      await new Promise(r => setTimeout(r, 2000));
    } catch(e) {
      console.log(`    Error: ${e.message}`);
    }
  }
  throw new Error(`Failed after ${retries} retries`);
}

async function main() {
  // Fetch A1 index
  console.log('Fetching A1 index...');
  const indexHtml = await fetchPage('https://test-english.com/reading/a1/');
  console.log(`  Status ok, length: ${indexHtml.length}`);
  
  // Save index for inspection
  writeFileSync('d:/Dokumen/NgocAnh/learn-english/hoc-ngu-phap/raw_a1_index.html', indexHtml, 'utf8');
  
  // Check if we got the real page or a block page
  if (indexHtml.includes('403') || indexHtml.includes('Access Denied') || indexHtml.length < 5000) {
    console.log('  Blocked! Page content:');
    console.log(indexHtml.substring(0, 500));
    return;
  }
  
  // Extract reading test links
  const linkMatches = [...indexHtml.matchAll(/href="(https?:\/\/test-english\.com\/reading\/a1\/[a1][^"]*\/?)"/gi)];
  let links = [...new Set(linkMatches.map(m => m[1]))];
  // Remove index page itself
  links = links.filter(l => l !== 'https://test-english.com/reading/a1/' && l.split('/').filter(Boolean).length > 3);
  
  console.log(`Found ${links.length} reading test links:`);
  links.forEach(l => console.log(`  ${l}`));
  
  if (links.length === 0) {
    console.log('\nFirst 2000 chars of index page:');
    console.log(indexHtml.substring(0, 2000));
    return;
  }
  
  const results = [];
  for (const url of links) {
    console.log(`\nScraping: ${url}`);
    try {
      const html = await fetchPage(url);
      const { title, passage, questions } = extractContent(html, url);
      console.log(`  Title: ${title}`);
      console.log(`  Passage: ${passage.length} chars`);
      console.log(`  Questions: ${questions.length}`);
      results.push({ url, title, passage, questions });
      
      // Save individual HTML for debugging
      const slug = url.split('/').filter(Boolean).pop();
      writeFileSync(`d:/Dokumen/NgocAnh/learn-english/hoc-ngu-phap/raw_${slug}.html`, html, 'utf8');
    } catch(e) {
      console.error(`  FAILED: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 1500));
  }
  
  writeFileSync(
    'd:/Dokumen/NgocAnh/learn-english/hoc-ngu-phap/scraped_reading_a1.json',
    JSON.stringify(results, null, 2), 'utf8'
  );
  console.log(`\nDone! Saved ${results.length} tests`);
}

main().catch(console.error);
