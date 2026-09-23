import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useUserStorage } from '../hooks/useUserStorage';
import { READING_DATABASE } from '../data/readingData';
import { VOCAB_DATABASE } from '../data/vocabularyByLevelAndPart';
import { VOCAB_BY_PART } from '../data/vocabularyByPart';
import { isDummyIpa, getDisplayIpa, fetchIpaOnline, formatIpa } from '../services/ipaService';

// Curated fallback dictionary for instant lookup
const QUICK_DICTIONARY = {
  paris: { ipa: '/ˈpærɪs/', pos: 'noun', meaning: 'Thủ đô Paris (Pháp)' },
  incredibly: { ipa: '/ɪŋˈkredɪbli/', pos: 'adverb', meaning: 'vô cùng, cực kỳ, không thể tin được', example: 'It was an incredibly exciting journey.' },
  saturating: { ipa: '/ˈsætʃəreɪtɪŋ/', pos: 'verb', meaning: 'làm ướt sũng, ngấm đẫm, bão hòa' },
  basement: { ipa: '/ˈbeɪsmənt/', pos: 'noun', meaning: 'tầng hầm của tòa nhà' },
  collapses: { ipa: '/kəˈlæpsɪz/', pos: 'verb', meaning: 'sụp đổ, đổ sập đột ngột' },
  pressure: { ipa: '/ˈpreʃər/', pos: 'noun', meaning: 'áp lực, sức ép' },
  decaying: { ipa: '/dɪˈkeɪɪŋ/', pos: 'adj', meaning: 'đang phân hủy, mục nát' },
  morbid: { ipa: '/ˈmɔːrbɪd/', pos: 'adj', meaning: 'rùng rợn, bệnh tật, ghê rợn' },
  catastrophe: { ipa: '/kəˈtæstrəfi/', pos: 'noun', meaning: 'thảm họa lớn, tai ương' },
  culmination: { ipa: '/ˌkʌlmɪˈneɪʃn/', pos: 'noun', meaning: 'đỉnh điểm, kết quả cuối cùng' },
  sanitary: { ipa: '/ˈsænətri/', pos: 'adj', meaning: 'thuộc về vệ sinh, sạch sẽ' },
  subterranean: { ipa: '/ˌsʌbtəˈreɪniən/', pos: 'adj', meaning: 'dưới lòng đất, ngầm' },
  musicians: { ipa: '/mjuːˈzɪʃnz/', pos: 'noun', meaning: 'các nhạc công, nhạc sĩ' },
  instruments: { ipa: '/ˈɪnstrəmənts/', pos: 'noun', meaning: 'nhạc cụ, công cụ' },
  equivalent: { ipa: '/ɪˈkwɪvələnt/', pos: 'adj', meaning: 'tương đương, ngang bằng' },
  totality: { ipa: '/toʊˈtæləti/', pos: 'noun', meaning: 'toàn phần (nhật thực)' },
  corona: { ipa: '/kəˈroʊnə/', pos: 'noun', meaning: 'vành nhật hoa (quầng sáng mặt trời)' },
  tensile: { ipa: '/ˈtensl/', pos: 'adj', meaning: 'chịu lực căng, lực kéo' },
  elasticity: { ipa: '/ˌiːlæˈstɪsəti/', pos: 'noun', meaning: 'độ đàn hồi, tính co giãn' },
  commencement: { ipa: '/kəˈmensmənt/', pos: 'noun', meaning: 'lễ tốt nghiệp đại học, sự bắt đầu' },
  graduated: { ipa: '/ˈɡrædʒueɪtɪd/', pos: 'verb', meaning: 'đã tốt nghiệp' },
  procrastination: { ipa: '/prəˌkræstɪˈneɪʃn/', pos: 'noun', meaning: 'sự trì hoãn công việc' },
  sustainable: { ipa: '/səˈsteɪnəbl/', pos: 'adj', meaning: 'bền vững, thân thiện môi trường' },
  lifestyle: { ipa: '/ˈlaɪfstaɪl/', pos: 'noun', meaning: 'lối sống, phong cách sống' },
  neighborhood: { ipa: '/ˈneɪbərhʊd/', pos: 'noun', meaning: 'khu dân cư, khu xóm' },
  confidence: { ipa: '/ˈkɑːnfɪdəns/', pos: 'noun', meaning: 'sự tự tin, niềm tin' },
  routine: { ipa: '/ruːˈtiːn/', pos: 'noun', meaning: 'thói quen sinh hoạt hàng ngày' },
  celebration: { ipa: '/ˌselɪˈbreɪʃn/', pos: 'noun', meaning: 'lễ kỷ niệm, bữa tiệc ăn mừng' },
};

const POS_LABELS = {
  noun: 'Danh từ (Noun)',
  verb: 'Động từ (Verb)',
  adjective: 'Tính từ (Adj)',
  adj: 'Tính từ (Adj)',
  adverb: 'Trạng từ (Adv)',
  adv: 'Trạng từ (Adv)',
  preposition: 'Giới từ (Prep)',
  conjunction: 'Liên từ (Conj)',
  pronoun: 'Đại từ (Pronoun)',
  phrase: 'Cụm từ (Phrase)',
  word: 'Từ vựng (Word)',
};

export default function WordLookupModal({ word, onClose, theme = 'dark' }) {
  const isLight = theme === 'light';
  const cleanWord = useMemo(() => {
    return (word || '').toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, '').trim();
  }, [word]);

  const [savedVocab, setSavedVocab] = useUserStorage('saved_video_vocab_v1', []);
  const [starredWordsMap, setStarredWordsMap] = useUserStorage('vocab_starred_v2', {});
  const [dictCache, setDictCache] = useUserStorage('lookup_dict_cache_v1', {});

  // Local state for fetched dictionary data
  const [ipa, setIpa] = useState('');
  const [pos, setPos] = useState(cleanWord.includes(' ') ? 'phrase' : 'word');
  const [meaning, setMeaning] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customMeaning, setCustomMeaning] = useState('');

  const isSaved = useMemo(() => {
    return savedVocab.some((v) => v.word?.toLowerCase() === cleanWord) || !!starredWordsMap[cleanWord];
  }, [savedVocab, cleanWord, starredWordsMap]);

  // Find in local offline databases first
  const findLocalEntry = useMemo(() => {
    if (!cleanWord) return null;
    if (QUICK_DICTIONARY[cleanWord]) return QUICK_DICTIONARY[cleanWord];

    // Check reading database vocabulary
    if (READING_DATABASE) {
      for (const lvl of Object.keys(READING_DATABASE)) {
        const tests = READING_DATABASE[lvl] || [];
        for (const t of tests) {
          const found = (t.vocabulary || []).find((v) => v.word?.toLowerCase() === cleanWord);
          if (found) {
            return {
              ipa: found.pron || '',
              pos: 'word',
              meaning: found.meaning || '',
            };
          }
        }
      }
    }

    // Check TOEIC parts database
    if (VOCAB_DATABASE) {
      for (const lvl of Object.keys(VOCAB_DATABASE)) {
        const parts = VOCAB_DATABASE[lvl] || [];
        for (const p of parts) {
          const found = (p.words || []).find((w) => w.word?.toLowerCase() === cleanWord);
          if (found) {
            return {
              ipa: found.ipa || '',
              pos: found.type || 'word',
              meaning: found.meaning || '',
              example: found.example || '',
            };
          }
        }
      }
    }

    // Check VOCAB_BY_PART database
    if (VOCAB_BY_PART) {
      for (const partKey of Object.keys(VOCAB_BY_PART)) {
        const list = VOCAB_BY_PART[partKey] || [];
        const found = list.find((v) => (v.word || '').toLowerCase() === cleanWord);
        if (found) {
          return {
            ipa: found.pron || '',
            pos: found.pos || 'word',
            meaning: found.meaning || '',
            example: found.example || '',
          };
        }
      }
    }

    return null;
  }, [cleanWord]);

  // Load / fetch word details
  useEffect(() => {
    if (!cleanWord) return;

    // 1. Check cache first (ignore legacy fake IPA)
    const cached = dictCache[cleanWord];
    if (cached && cached.ipa && !isDummyIpa(cached.ipa, cleanWord)) {
      setIpa(formatIpa(cached.ipa));
      setPos(cached.pos || 'word');
      setMeaning(cached.meaning || '');
      setCustomMeaning(cached.meaning || '');
      setDefinition(cached.definition || '');
      setExample(cached.example || '');
      setIsLoading(false);
      return;
    }

    // 2. Check local database
    if (findLocalEntry && findLocalEntry.ipa && !isDummyIpa(findLocalEntry.ipa, cleanWord)) {
      setIpa(formatIpa(findLocalEntry.ipa));
      setPos(findLocalEntry.pos || 'word');
      setMeaning(findLocalEntry.meaning || '');
      setCustomMeaning(findLocalEntry.meaning || '');
      setExample(findLocalEntry.example || '');
      setIsLoading(false);
      return;
    }

    // 3. Fast Online fetch via Google Translate (300ms) + Real IPA from Datamuse/Dict
    let isCancelled = false;
    setIsLoading(true);
    setMeaning('Đang tra cứu từ điển...');
    setCustomMeaning('');

    // Immediate smart initial IPA (0ms, guaranteed phonetic symbol, never /cleanWord/)
    const initialSmartIpa = getDisplayIpa(cleanWord);
    setIpa(initialSmartIpa);

    const fetchWordInfo = async () => {
      let viMeaning = '';
      let wordIpa = initialSmartIpa;
      let wordPos = cleanWord.includes(' ') ? 'phrase' : 'word';
      let wordDef = '';
      let wordEx = '';

      // Step A: Fast Google Translate API call with 2.5s strict timeout
      try {
        const trController = new AbortController();
        const trTimeout = setTimeout(() => trController.abort(), 2500);
        const trRes = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(cleanWord)}`,
          { signal: trController.signal }
        );
        clearTimeout(trTimeout);
        if (trRes.ok) {
          const trData = await trRes.json();
          if (trData && trData[0]) {
            viMeaning = trData[0].map((item) => item[0]).filter(Boolean).join('').trim();
          }
        }
      } catch (e) {
        // Translation API error or timeout
      }

      // If translation arrived, IMMEDIATELY show it to user in ~300ms!
      if (!isCancelled && viMeaning) {
        setMeaning(viMeaning);
        setCustomMeaning(viMeaning);
        setIsLoading(false);
      }

      // Step B: Fetch real high-accuracy IPA from Datamuse (Tier 1) / Free Dict (Tier 2)
      try {
        const realOnlineIpa = await fetchIpaOnline(cleanWord);
        if (realOnlineIpa && !isDummyIpa(realOnlineIpa, cleanWord)) {
          wordIpa = realOnlineIpa;
        }
      } catch (e) {}

      // Step C: Optional definition from Free Dictionary API
      try {
        const dictController = new AbortController();
        const dictTimeout = setTimeout(() => dictController.abort(), 1800);
        const dictRes = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`,
          { signal: dictController.signal }
        );
        clearTimeout(dictTimeout);
        if (dictRes.ok) {
          const dictData = await dictRes.json();
          const first = dictData && dictData[0];
          if (first && first.meanings && first.meanings.length > 0) {
            wordPos = first.meanings[0].partOfSpeech || wordPos;
            const dObj = first.meanings[0].definitions && first.meanings[0].definitions[0];
            if (dObj) {
              wordDef = dObj.definition || '';
              wordEx = dObj.example || '';
            }
          }
        }
      } catch (e) {}

      if (!isCancelled) {
        const finalMeaning = viMeaning || (wordDef ? `(Định nghĩa): ${wordDef}` : `Từ vựng: ${cleanWord}`);
        setIpa(wordIpa);
        setPos(wordPos);
        setMeaning(finalMeaning);
        setCustomMeaning(finalMeaning);
        if (wordDef) setDefinition(wordDef);
        if (wordEx) setExample(wordEx);
        setIsLoading(false);

        // Cache result for instant 0ms subsequent lookups
        setDictCache((prev) => ({
          ...prev,
          [cleanWord]: {
            ipa: wordIpa,
            pos: wordPos,
            meaning: finalMeaning,
            definition: wordDef,
            example: wordEx,
          },
        }));
      }
    };

    fetchWordInfo();

    return () => {
      isCancelled = true;
    };
  }, [cleanWord, findLocalEntry]);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(cleanWord);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  const handleToggleSave = () => {
    const finalMeaningToSave = (customMeaning || meaning).trim();
    if (isSaved) {
      setSavedVocab((prev) => prev.filter((v) => v.word?.toLowerCase() !== cleanWord));
      setStarredWordsMap((prev) => ({ ...prev, [cleanWord]: false }));
    } else {
      const realIpaToSave = getDisplayIpa(cleanWord, ipa);
      const newEntry = {
        word: cleanWord,
        ipa: realIpaToSave,
        pos: pos || (cleanWord.includes(' ') ? 'phrase' : 'word'),
        meaning: finalMeaningToSave || `Từ vựng: ${cleanWord}`,
        example: example || '',
        definition: definition || '',
        savedAt: new Date().toISOString(),
      };
      setSavedVocab((prev) => [newEntry, ...prev.filter((v) => v.word?.toLowerCase() !== cleanWord)]);
      setStarredWordsMap((prev) => ({ ...prev, [cleanWord]: true }));
    }
  };

  if (!cleanWord) return null;

  const displayPos = POS_LABELS[pos?.toLowerCase()] || pos || 'Từ vựng';

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl animate-scaleUp transition-all ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xs font-black text-blue-500 uppercase tracking-wider flex items-center gap-1.5">
            <i className="fa-solid fa-book-bookmark" /> Tra từ điển Anh - Việt
          </span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Word Card */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">
              {cleanWord}
            </h3>
            <p className="text-xs font-mono text-slate-400 font-bold mt-0.5">
              {getDisplayIpa(cleanWord, ipa)}
            </p>
          </div>

          <button
            onClick={speak}
            className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition hover:scale-105 cursor-pointer"
            title="Phát âm từ này"
          >
            <i className="fa-solid fa-volume-high text-sm" />
          </button>
        </div>

        {/* Meaning Box */}
        <div
          className={`mt-4 p-4 rounded-2xl border space-y-2 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700/80'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-500">
              {displayPos}
            </span>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[11px] text-slate-400 hover:text-blue-500 flex items-center gap-1 transition"
              title="Chỉnh sửa nghĩa"
            >
              <i className="fa-solid fa-pen-to-square text-[10px]" />
              <span>{isEditing ? 'Xong' : 'Sửa nghĩa'}</span>
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center gap-2 py-2 text-xs text-slate-400">
              <i className="fa-solid fa-spinner fa-spin text-blue-500" />
              <span>Đang tra cứu từ điển trực tuyến...</span>
            </div>
          ) : isEditing ? (
            <div className="space-y-1.5 pt-1">
              <textarea
                value={customMeaning}
                onChange={(e) => setCustomMeaning(e.target.value)}
                rows={2}
                className="w-full text-xs p-2 rounded-xl border border-blue-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-hidden"
                placeholder="Nhập nghĩa tiếng Việt hoặc ghi chú cá nhân..."
              />
              <span className="text-[10px] text-slate-400 block">Nghĩa này sẽ được lưu vào Sổ từ vựng của bạn.</span>
            </div>
          ) : (
            <p className="text-base font-bold text-slate-800 dark:text-slate-100 leading-snug">
              {customMeaning || meaning}
            </p>
          )}

          {/* English Definition / Example if available */}
          {!isLoading && definition && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/70 space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                "{definition}"
              </p>
              {example && (
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  Ví dụ: <span className="italic">{example}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-5 flex gap-2">
          <button
            onClick={handleToggleSave}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold transition shadow-sm cursor-pointer ${
              isSaved
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-101'
            }`}
          >
            <i className={`fa-solid ${isSaved ? 'fa-check' : 'fa-bookmark'}`} />
            <span>{isSaved ? 'Đã lưu trong Sổ từ vựng' : 'Lưu vào Sổ từ vựng'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== 'undefined' && document.body) {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}
