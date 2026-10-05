import { readFileSync, writeFileSync } from 'fs';
import { Innertube } from 'youtubei.js';

const TARGET_IDS = ['n3Xv_g3g-mA', 'u4ZoJKF_VuA', 'UjtOGPJ0URM', 'eIho2S0ZahI', 'arJLy3hX1E8', 'MBRqu0YOH14', 'iCvmsMzlF7o', 'lEXBxijQREo', '_0472_sKjbs', '9sT08yR3U14', 'foLf5Bi9qPg', 'a9P994Uj92k'];

function parseXml(xml) {
  const subs = [];
  const regex = /<text start="([\d.]+)"(?:\s+dur="([\d.]+)")?[^>]*>([\s\S]*?)<\/text>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    const start = parseFloat(m[1]);
    const dur = m[2] ? parseFloat(m[2]) : 2;
    const raw = m[3].replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/\n/g,' ').replace(/<[^>]+>/g,'').trim();
    if (raw && raw.length > 1) subs.push({ start: Math.round(start*100)/100, end: Math.round((start+dur)*100)/100, text: raw });
  }
  return subs;
}

async function main() {
  console.log('Init...');
  const yt = await Innertube.create({ lang: 'en', location: 'US', retrieve_player: true });
  const cacheFile = 'd:/Dokumen/NgocAnh/learn-english/hoc-ngu-phap/all_video_subtitles.json';
  const cache = JSON.parse(readFileSync(cacheFile, 'utf8'));
  let ok = 0;

  for (const videoId of TARGET_IDS) {
    console.log(`\n▶ ${videoId}`);
    try {
      const info = await yt.getInfo(videoId, 'WEB');
      const tracks = info.captions?.caption_tracks || [];
      const enTrack = tracks.find(t => t.language_code === 'en' && !t.kind)
                   || tracks.find(t => t.language_code?.startsWith('en'))
                   || tracks[0];
      if (!enTrack?.base_url) { console.log('  No base_url'); continue; }
      
      // Print FULL URL
      const fullUrl = enTrack.base_url;
      console.log(`  FULL URL: ${fullUrl}`);
      
      // Try fetching XML directly - no extra headers
      const r = await fetch(fullUrl);
      const body = await r.text();
      console.log(`  Status: ${r.status}, Body len: ${body.length}`);
      
      if (body.includes('<text')) {
        const subs = parseXml(body);
        console.log(`  ✅ ${subs.length} subs!`);
        cache[videoId] = subs;
        writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
        ok++;
        continue;
      }

      // The URL may need &lang= appended
      // Extract what lang is in URL
      const langInUrl = fullUrl.match(/[?&]lang=([^&]*)/)?.[1];
      console.log(`  lang in URL: ${langInUrl || 'NONE - try appending'}`);
      
      if (!langInUrl) {
        // Try appending lang
        for (const lang of ['en', 'en-US']) {
          const r2 = await fetch(fullUrl + `&lang=${lang}`);
          const b2 = await r2.text();
          console.log(`  +lang=${lang}: status=${r2.status} len=${b2.length} snippet=${b2.substring(0,80)}`);
          if (b2.includes('<text')) {
            const subs = parseXml(b2);
            console.log(`  ✅ ${subs.length} subs with &lang=${lang}!`);
            cache[videoId] = subs;
            writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
            ok++;
            break;
          }
        }
      }
    } catch(e) { console.error(`  ERROR: ${e.message}`); }
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log(`\nDone: ${ok}/${TARGET_IDS.length}`);
}
main().catch(console.error);
