import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { buildCsvUrl } from '../config/sheets';
import study4ListeningData from '../data/study4ListeningTest1.json';
import study4ReadingData from '../data/study4ReadingTest1.json';

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// Parse Sheet 1 format: Chủ đề, STT, Từ vựng, Từ loại, Phát âm, Nghĩa, Câu/cụm từ, Nghĩa câu, Note
function parseSheet1Row(row, currentTopic) {
  const topic = row[0] || currentTopic;
  const stt = row[1];
  const word = row[2];
  const partOfSpeech = row[3];
  const pronunciation = row[4];
  const meaning = row[5];
  const examplePhrase = row[6];
  const exampleMeaning = row[7];
  const note = row[8];
  return { topic, stt, word, partOfSpeech, pronunciation, meaning, examplePhrase, exampleMeaning, note };
}

// Parse Sheet 2 format: Chủ đề, Part, STT, Từ vựng, Từ loại, Phát âm, Nghĩa, Câu/cụm từ, Note
function parseSheet2Row(row, currentTopic, currentPart) {
  const topic = row[0] || currentTopic;
  const part = row[1] || currentPart;
  const stt = row[2];
  const word = row[3];
  const partOfSpeech = row[4];
  const pronunciation = row[5];
  const meaning = row[6];
  const examplePhrase = row[7];
  const note = row[8];
  return { topic, part, stt, word, partOfSpeech, pronunciation, meaning, examplePhrase, note };
}

// Parse Sheet 3 format (Vocab By Part & IELTS): Chủ đề (Part), STT, Từ vựng, Phiên âm, Từ loại, Nghĩa tiếng Việt
function parseSheet3Row(row, currentPart) {
  const part = row[0] ? row[0].trim() : currentPart;
  const stt = row[1];
  const word = row[2] ? row[2].trim() : '';
  const pronunciation = row[3] ? row[3].trim() : '';
  const partOfSpeech = row[4] ? row[4].trim() : '';
  const meaning = row[5] ? row[5].trim() : '';
  return {
    part: part || 'Part 1',
    topic: part || 'Part 1',
    stt,
    word,
    pron: pronunciation,
    pronunciation,
    partOfSpeech,
    pos: partOfSpeech,
    meaning,
  };
}

function processCSV(data, sheetType) {
  const results = [];
  let currentTopic = '';
  let currentPart = '';
  let headerSkipped = false;

  for (const row of data) {
    // Skip empty rows
    if (!row || row.every(cell => !cell || cell.trim() === '')) continue;

    const rowStr = row.join(',');

    // Header detection for Sheet 1 & 2 vs Sheet 3
    if (rowStr.includes('STT') && (rowStr.includes('Từ vựng') || rowStr.includes('Phát âm') || rowStr.includes('Phiên âm'))) {
      headerSkipped = true;
      continue;
    }
    if (!headerSkipped) continue;

    // For sheet 2, skip the top info section
    if (rowStr.includes('CẤU TRÚC VÀ THANG ĐIỂM') || rowStr.includes('Kỹ năng') || rowStr.includes('Tổng cộng')) continue;
    if (rowStr.includes('Lưu ý:')) continue;

    if (sheetType === 1) {
      const parsed = parseSheet1Row(row, currentTopic);
      if (parsed.topic) currentTopic = parsed.topic;
      if (parsed.word && parsed.word.trim()) results.push(parsed);
    } else if (sheetType === 2) {
      const parsed = parseSheet2Row(row, currentTopic, currentPart);
      if (parsed.topic) currentTopic = parsed.topic;
      if (parsed.part) currentPart = parsed.part;
      if (parsed.word && parsed.word.trim()) results.push(parsed);
    } else if (sheetType === 3) {
      const parsed = parseSheet3Row(row, currentPart);
      if (parsed.part) currentPart = parsed.part;
      if (parsed.word && parsed.word.trim()) results.push(parsed);
    }
  }
  return results;
}

const getFallbackData = (sheetType, gid) => {
  if (sheetType === 2) {
    if (gid === '2091927215' || gid === 'toeic-listening') {
      return study4ListeningData;
    }
    if (gid === '65110542' || gid === 'toeic-reading') {
      return study4ReadingData;
    }
    return study4ListeningData;
  }
  return null;
};

export function useGoogleSheet(baseUrl, gid, sheetType = 1, directUrl = null) {
  const fallback = getFallbackData(sheetType, gid);
  const [data, setData] = useState(() => (fallback ? fallback : []));
  const [loading, setLoading] = useState(() => (fallback ? false : true));
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const cacheKey = `gsheet_${gid || 'vocab_part'}_${sheetType}`;

  useEffect(() => {
    let isMounted = true;
    const currentFallback = getFallbackData(sheetType, gid);

    // If static fallback is available, populate data immediately so user never hangs
    if (currentFallback && currentFallback.length > 0) {
      setData(currentFallback);
      setLoading(false);
      setError(null);
    }

    // Try localStorage cache if valid and fresh
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { timestamp, payload } = JSON.parse(cached);
        if (Array.isArray(payload) && payload.length > 0 && Date.now() - timestamp < CACHE_TTL) {
          setData(payload);
          setLoading(false);
          setError(null);
          return;
        } else if (Array.isArray(payload) && payload.length === 0) {
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (e) {}

    // Only show loading spinner if we don't have any data yet
    if (!currentFallback || currentFallback.length === 0) {
      setLoading(true);
    }
    setError(null);

    const url = directUrl || (gid ? buildCsvUrl(baseUrl, gid) : `${baseUrl}?output=csv`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const parseAndSetData = (csvText) => {
      if (!csvText || typeof csvText !== 'string' || !csvText.trim()) {
        throw new Error('Nội dung CSV nhận được trống');
      }

      Papa.parse(csvText, {
        complete: (results) => {
          if (!isMounted) return;
          try {
            const processed = processCSV(results.data, sheetType);
            if (processed && processed.length > 0) {
              setData(processed);
              setError(null);
              try {
                localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), payload: processed }));
              } catch (e) {}
            } else if (currentFallback && currentFallback.length > 0) {
              setData(currentFallback);
              setError(null);
            } else {
              setError('Không tìm thấy từ vựng trong dữ liệu Google Sheet');
            }
          } catch (err) {
            if (currentFallback && currentFallback.length > 0) {
              setData(currentFallback);
              setError(null);
            } else {
              setError('Lỗi xử lý dữ liệu từ vựng');
            }
          }
          setLoading(false);
        },
        error: (err) => {
          if (!isMounted) return;
          if (currentFallback && currentFallback.length > 0) {
            setData(currentFallback);
            setError(null);
          } else {
            setError(err.message || 'Lỗi đọc dữ liệu CSV');
          }
          setLoading(false);
        },
      });
    };

    // Attempt direct fetch with 3s timeout
    fetch(url, { signal: controller.signal })
      .then(res => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.text();
      })
      .then(csvText => parseAndSetData(csvText))
      .catch(err => {
        clearTimeout(timeoutId);
        if (!isMounted) return;

        // If fallback exists, gracefully use fallback without showing error or hanging
        if (currentFallback && currentFallback.length > 0) {
          setData(currentFallback);
          setError(null);
          setLoading(false);
          return;
        }

        // Try proxy fallback only if no static fallback exists
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const proxyController = new AbortController();
        const proxyTimeoutId = setTimeout(() => proxyController.abort(), 3000);

        fetch(proxyUrl, { signal: proxyController.signal })
          .then(res => {
            clearTimeout(proxyTimeoutId);
            return res.json();
          })
          .then(json => {
            if (json && json.contents) {
              parseAndSetData(json.contents);
            } else {
              throw new Error('Proxy không trả về dữ liệu');
            }
          })
          .catch(err2 => {
            clearTimeout(proxyTimeoutId);
            if (!isMounted) return;
            if (currentFallback && currentFallback.length > 0) {
              setData(currentFallback);
              setError(null);
            } else {
              setError(`Không thể tải dữ liệu: Google Sheets đang phản hồi chậm hoặc ngoại tuyến.`);
            }
            setLoading(false);
          });
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [baseUrl, gid, sheetType, directUrl, cacheKey, reloadKey]);

  const refresh = () => {
    try { localStorage.removeItem(cacheKey); } catch (e) {}
    setReloadKey(k => k + 1);
    setLoading(true);
  };

  return { data, loading, error, refresh };
}


