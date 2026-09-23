/**
 * fetch_subtitles_youtubei.mjs
 * Fetch YouTube subtitles using youtubei.js (proper InnerTube client simulation)
 */
import { readFileSync, writeFileSync } from 'fs';
import { Innertube } from 'youtubei.js';

const MISSING_IDS = [
  'lEXBxijQREo',
  '_0472_sKjbs',
  '9sT08yR3U14',
  'foLf5Bi9qPg',
  'a9P994Uj92k',
  'n3Xv_g3g-mA',
  'u4ZoJKF_VuA',
  'eIho2S0ZahI',
  'arJLy3hX1E8',
  'MBRqu0YOH14',
  'iCvmsMzlF7o',
  'WppvXEcO_gQ',
  'UjtOGPJ0URM',
  'w_10sP73W94',
  'j73XqQ3Jt0M',
  'd_2H08k4l60',
];

async function fetchTranscript(yt, videoId) {
  const info = await yt.getInfo(videoId);
  
  // Try to get transcript
  const transcriptInfo = await info.getTranscript();
  
  if (transcriptInfo?.transcript?.content?.body?.initial_segments) {
    const segments = transcriptInfo.transcript.content.body.initial_segments;
    const subs = segments
      .filter(s => s.transcript_segment)
      .map((s, idx) => {
        const seg = s.transcript_segment;
        const startMs = parseInt(seg.start_ms || 0);
        const endMs = parseInt(seg.end_ms || startMs + 2000);
        const text = seg.snippet?.text || seg.snippet?.runs?.map(r => r.text).join('') || '';
        return {
          start: Math.round((startMs / 1000) * 100) / 100,
          end: Math.round((endMs / 1000) * 100) / 100,
          text: text.trim(),
        };
      })
      .filter(s => s.text);
    
    return subs;
  }
  
  throw new Error('No transcript segments found');
}

async function main() {
  const cacheFile = 'd:/Dokumen/NgocAnh/learn-english/hoc-ngu-phap/all_video_subtitles.json';
  const cache = JSON.parse(readFileSync(cacheFile, 'utf8'));

  console.log('Initializing YouTubei.js...');
  const yt = await Innertube.create({
    lang: 'en',
    location: 'US',
    retrieve_player: false,
  });
  console.log('✅ YouTubei.js initialized\n');

  let successCount = 0;
  let failCount = 0;

  for (const videoId of MISSING_IDS) {
    console.log(`▶ ${videoId}`);
    try {
      const subs = await fetchTranscript(yt, videoId);
      console.log(`  ✅ Got ${subs.length} subtitle segments`);
      if (subs.length > 0) {
        console.log(`  Preview: "${subs[0].text}" [${subs[0].start}s - ${subs[0].end}s]`);
      }
      cache[videoId] = subs;
      writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
      successCount++;
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
      failCount++;
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`\n✅ Done! Success: ${successCount}, Failed: ${failCount}`);
}

main().catch(console.error);
